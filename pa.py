import requests
from bs4 import BeautifulSoup
import os

# 维基百科页面 URL
url = "https://en.wikipedia.org/wiki/States_of_Brazil"

# 获取网页内容
headers = {"User-Agent": "Mozilla/5.0"}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

# 找到目标表格
table = soup.find("table", class_="wikitable sortable")

# 遍历表格行（跳过表头）
for row in table.find_all("tr")[1:]:
    cols = row.find_all("td")
    if not cols:
        continue

    # 获取州名
    state_link = cols[0].find("a")
    state_name = state_link.get("title") if state_link else "unknown"

    # 格式化州名：全小写，去掉空格和下划线
    formatted_name = state_name.lower().replace(" ", "").replace("_", "")

    # 获取州旗图片链接
    img_tag = cols[0].find("img")
    if img_tag:
        img_src = img_tag.get("src")
        if img_src.startswith("//"):
            img_url = "https:" + img_src
        else:
            img_url = img_src

        # 下载图片
        img_data = requests.get(img_url).content
        file_path = f"{formatted_name}_flag.png"
        with open(file_path, "wb") as f:
            f.write(img_data)
        print(f"✅ 下载: {state_name} → {file_path}")
    else:
        print(f"⚠️ 没有找到图片: {state_name}")
