import os
import time
from git import Repo

def get_last_modified_time(directory_path):
    last_modified_time = 0

    for root, dirs, files in os.walk(directory_path):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                modified_time = os.path.getmtime(file_path)
                if modified_time > last_modified_time:
                    last_modified_time = modified_time
            except OSError:
                pass

    return last_modified_time

def git_commit(repo_path, commit_message):
    repo = Repo(repo_path)
    repo.git.add('--all')
    repo.index.commit(commit_message)
    print("Committed changes: {}".format(commit_message))

def watch_directory(repo_path):
    if not os.path.isdir(repo_path) or not os.path.exists(os.path.join(repo_path, '.git')):
        print("Invalid repository path.")
        return

    last_modified_time = get_last_modified_time(repo_path)

    while True:
        current_modified_time = get_last_modified_time(repo_path)

        if current_modified_time > last_modified_time:
            last_modified_time = current_modified_time
            commit_message = "update {}".format(time.strftime("%H:%M:%S"))
            git_commit(repo_path, commit_message)
        else:
        	print("No change")

        # Khoảng thời gian đợi giữa các lần kiểm tra
        time.sleep(10)

# Nhập đường dẫn thư mục dự án từ người dùng
repo_path = input("Nhập đường dẫn thư mục dự án (Repository path): ")

# Xử lý đường dẫn để tránh lỗi khi nhập ký tự backslash
repo_path = repo_path.replace("\\", "\\\\")

# Kiểm tra và chạy chương trình
watch_directory(repo_path)
