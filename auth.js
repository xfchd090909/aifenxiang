// 配置信息 - 替换为你的OAuth应用信息
const CLIENT_ID = '你的GitHub OAuth应用Client ID';
const REDIRECT_URI = 'https://github.com/xfchd090909/aifenxiang/callback.html';
const SCOPES = 'user:email'; // 请求的权限

// 检查用户是否已登录
function checkLoginStatus() {
    const token = localStorage.getItem('githubToken');
    const user = localStorage.getItem('githubUser');
    
    if (token && user) {
        showLoggedInState(JSON.parse(user));
    } else {
        showLoginButton();
    }
}

// 显示登录状态
function showLoggedInState(user) {
    document.getElementById('loginStatus').classList.remove('hidden');
    document.getElementById('loginBtnContainer').classList.add('hidden');
    document.getElementById('userInfo').textContent = `已登录为: ${user.login}`;
}

// 显示登录按钮
function showLoginButton() {
    document.getElementById('loginStatus').classList.add('hidden');
    document.getElementById('loginBtnContainer').classList.remove('hidden');
}

// 生成GitHub授权URL
function getGitHubAuthUrl() {
    return `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}`;
}

// 登录处理
document.getElementById('githubLoginBtn').addEventListener('click', () => {
    window.location.href = getGitHubAuthUrl();
});

// 退出登录处理
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('githubToken');
    localStorage.removeItem('githubUser');
    showLoginButton();
});

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', checkLoginStatus);
</script>
