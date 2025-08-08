exports.handler = async (event) => {
    const { code } = JSON.parse(event.body);
    
    // 配置参数
    const clientId = 'Ov23lid4wahWfAxWQJAp';
    const clientSecret = '1f6ffd675faec7ee90fbb1aa5c8266d22d3a524e';
    const redirectUri = 'https://aeafx.netlify.app/callback.html';
    
    try {
        // 1. 用授权码交换访问令牌
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                redirect_uri: redirectUri
            })
        });
        
        const tokenData = await tokenResponse.json();
        
        if (tokenData.error) {
            throw new Error(tokenData.error_description || tokenData.error);
        }
        
        // 2. 使用访问令牌获取用户信息
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${tokenData.access_token}`,
                'User-Agent': 'GitHub Pages OAuth App'
            }
        });
        
        const userData = await userResponse.json();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ user: userData })
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};
