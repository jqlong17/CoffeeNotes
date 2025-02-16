import os
import csv
import time
import json
import uuid
import random
import requests
import logging
from datetime import datetime, timezone
import pandas as pd

# API配置
DEEPSEEK_API_KEY = "sk-70dc6caf16b9435ca752eef744a5f9dd"
DEEPSEEK_API_ENDPOINT = "https://api.deepseek.com/v1/chat/completions"

# 文件路径
AUTHORS_CSV_PATH = "/Users/ruska/project/咖啡笔记/coffee-notes/data/csv/authors.csv"
POSTS_CSV_PATH = "/Users/ruska/project/咖啡笔记/coffee-notes/data/csv/posts.csv"
GENERATED_CONTENT_DIR = "/Users/ruska/project/咖啡笔记/coffee-notes/data/generated_content"
LOG_FILE = "generate_articles.log"

# 配置日志
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# 确保生成内容的目录存在
os.makedirs(GENERATED_CONTENT_DIR, exist_ok=True)

# 咖啡相关的emoji列表
COFFEE_EMOJIS = ['☕️', '🫘', '🏠', '🎨', '⚗️', '❓', '🔥', '🏗️', '📚', '🏺', 
                 '🍵', '🎨', '🔥', '🗺️', '📦', '💨', '⚙️', '💧', '🌱', '🧊',
                 '🌡️', '🏺', '🔍', '🎯', '🏆', '📝', '🧪', '🏪']

def load_authors():
    """加载作者信息"""
    return pd.read_csv(AUTHORS_CSV_PATH)

def load_posts():
    """加载现有的文章"""
    if os.path.exists(POSTS_CSV_PATH):
        return pd.read_csv(POSTS_CSV_PATH)
    return pd.DataFrame(columns=['user_id', 'article_id', 'title', 'image_emoji', 'image_content', 
                               'article_content', 'likes', 
                               'created_at', 'updated_at'])

def generate_title_and_image(author_name):
    """生成文章标题和图片内容"""
    prompts = [
        f"请以{author_name}的身份，生成一个关于咖啡的文章标题和配图文案。要求：\n1. 标题要专业、吸引人，字数在15-30字之间\n2. 配图文案分两行，每行都要是一个完整的句子，每行5-10个字\n请按以下格式返回：\n标题：[标题文本]\n配图：\n[第一行文本]\n[第二行文本]",
        f"你是{author_name}，请创作一个咖啡相关的文章标题和配图文案。要求：\n1. 标题要体现专业性和趣味性\n2. 配图文案分两行，每行都要是一个完整的句子，每行5-10个字\n请按以下格式返回：\n标题：[标题文本]\n配图：\n[第一行文本]\n[第二行文本]",
        f"作为{author_name}，请设计一个咖啡主题的文章标题和配图文案。要求：\n1. 标题要能引起读者兴趣\n2. 配图文案分两行，每行都要是一个完整的句子，每行5-10个字\n请按以下格式返回：\n标题：[标题文本]\n配图：\n[第一行文本]\n[第二行文本]"
    ]
    
    prompt = random.choice(prompts)
    
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 200
    }

    try:
        response = requests.post(DEEPSEEK_API_ENDPOINT, headers=headers, json=data)
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]
        
        # 解析返回的内容
        title = ""
        image_lines = []
        
        # 标记是否正在处理配图部分
        is_image_section = False
        
        for line in content.split('\n'):
            line = line.strip()
            if line.startswith('标题：'):
                title = line.replace('标题：', '').strip()
            elif line.startswith('配图：'):
                is_image_section = True
            elif is_image_section and line:
                image_lines.append(line)
        
        # 确保只取前两行作为配图文案
        image_content = '\n'.join(image_lines[:2]) if len(image_lines) >= 2 else None
        
        if not title or not image_content:
            return None, None
            
        return title, image_content
    except Exception as e:
        logging.error(f"生成标题时出错: {str(e)}")
        return None, None

def generate_article_content(title, image_content, author_name):
    """生成文章内容"""
    prompt = f"""请以{author_name}的身份，写一篇关于"{title}"的文章。
要求：
1. 文章长度在1000字左右
2. 使用Markdown格式
3. 内容要专业、实用、有深度
4. 行文要自然流畅，像真人写作风格
5. 可以结合"{image_content}"的主题
6. 包含实际的经验和技巧
7. 可以适当加入一些专业术语，但要确保通俗易懂
8. 分段要合理，层次要分明

请直接输出文章内容，不要有任何前缀说明。"""

    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 2000
    }

    try:
        response = requests.post(DEEPSEEK_API_ENDPOINT, headers=headers, json=data)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        logging.error(f"生成文章时出错: {str(e)}")
        return None

def process_content_for_csv(content):
    """处理内容以适应CSV格式"""
    if content is None:
        return ""
    content = content.replace('\n', '\\n')
    content = content.replace('"', '""')
    return content

def create_new_post(author):
    """创建新的文章"""
    # 生成标题和配图文案
    title, image_content = generate_title_and_image(author['name'])
    if not title or not image_content:
        return None
    
    # 生成文章内容
    article_content = generate_article_content(title, image_content, author['name'])
    if not article_content:
        return None
    
    # 生成随机点赞数（200-2000之间）
    likes = random.randint(200, 2000)
    
    # 获取当前时间
    now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    
    # 获取现有文章，确定下一个 article_id
    posts_df = load_posts()
    if len(posts_df) == 0:
        next_id = 1
    else:
        # 将现有的 article_id 转换为整数并找到最大值
        max_id = max([int(str(aid)) for aid in posts_df['article_id']])
        next_id = max_id + 1
    
    # 创建新文章数据
    return {
        'user_id': author['user_id'],  # 作者ID
        'article_id': str(next_id),  # 按顺序递增的文章ID
        'title': title,
        'image_emoji': random.choice(COFFEE_EMOJIS),
        'image_content': image_content,
        'article_content': process_content_for_csv(article_content),
        'likes': likes,
        'created_at': now,
        'updated_at': now
    }

def save_posts(posts_df):
    """保存文章到CSV文件"""
    posts_df.to_csv(POSTS_CSV_PATH, index=False, quoting=csv.QUOTE_NONNUMERIC)

def main():
    """主函数"""
    logging.info(f"开始时间: {datetime.now()}")
    
    try:
        # 加载作者和文章数据
        authors_df = load_authors()
        posts_df = load_posts()
        
        # 随机选择一个作者
        author = authors_df.sample(n=1).iloc[0].to_dict()
        logging.info(f"选择的作者: {author['name']}")
        
        # 创建新文章
        new_post = create_new_post(author)
        if new_post:
            # 添加新文章到DataFrame
            posts_df = pd.concat([posts_df, pd.DataFrame([new_post])], ignore_index=True)
            
            # 保存更新后的文章列表
            save_posts(posts_df)
            logging.info(f"新文章已保存: {new_post['title']}")
        else:
            logging.error("文章生成失败")
    
    except Exception as e:
        logging.error(f"发生错误: {str(e)}")
        logging.error(f"错误类型: {type(e)}")
        logging.error(f"错误详细信息: {e.__dict__}")
        logging.info("等待5分钟后重试...")
    
    logging.info(f"结束时间: {datetime.now()}\n")

if __name__ == "__main__":
    logging.info("文章生成脚本启动")
    logging.info(f"进程ID: {os.getpid()}")
    logging.info(f"工作目录: {os.getcwd()}")
    logging.info("开始循环生成文章...\n")
    
    while True:
        try:
            main()
            logging.info("等待5分钟后继续...")
            time.sleep(300)  # 等待5分钟
        except KeyboardInterrupt:
            logging.info("\n程序已停止")
            break
        except Exception as e:
            logging.error(f"主循环发生错误: {str(e)}")
            logging.info("等待5分钟后重试...")
            time.sleep(300)  # 出错后等待5分钟再试 