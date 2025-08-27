# 📝 Git + GitHub + Branching Workflow Cheat Sheet

# -------------------------
# 1. Initial Setup (once per project)
# -------------------------
cd path/to/your/project        # go into your project folder
git init                       # initialize Git
git add .                      # stage all files
git commit -m "Initial commit" # first snapshot

# connect to GitHub (replace with your repo URL)
git remote add origin https://github.com/yourusername/repo-name.git
git branch -M main             # rename default branch to main
git push -u origin main        # upload code to GitHub

# -------------------------
# 2. Everyday Workflow (make changes)
# -------------------------
git status                     # check what changed
git add .                      # stage changes
git commit -m "describe change" # save snapshot
git push                       # upload to GitHub

# -------------------------
# 3. Branching
# -------------------------
git branch <branch-name>       # create new branch
git switch <branch-name>       # switch to branch
# or create + switch in one step
git switch -c <branch-name>

git branch                     # list all branches

# -------------------------
# 4. Merging Branches
# -------------------------
git switch main                # go back to main branch
git merge <branch-name>        # merge feature branch into main
git push                       # push updated main to GitHub

# -------------------------
# 5. Deleting Branches
# -------------------------
git branch -d <branch-name>    # delete branch locally (safe)
git branch -D <branch-name>    # force delete (not merged)
git push origin --delete <branch-name> # delete branch from GitHub

# -------------------------
# 6. Remote Branches
# -------------------------
git push -u origin <branch-name> # push new branch to GitHub
git fetch                        # fetch all branches from GitHub

# -------------------------
# 7. Logs (View History)
# -------------------------
git log                        # full detailed history
git log --oneline              # compact history (1 commit per line)
git log --oneline --graph --all # visual graph of all branches
