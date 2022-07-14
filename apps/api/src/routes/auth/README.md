# Auth
Registration and authentication

## Login flow:
1. Get JWT token:
```javascript
const res = await request({
  'method': 'POST',
  'url': 'localhost:5000/auth/login',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "password": "1234",
    "email": "alice@blogger.io"
  })
})
// {jwt: '<token string>'}
```

2. Put token into `Authorization` bearer header:
```javascript
const res = await request({
  'method': 'GET',
  'url': 'localhost:5000/protected/route',
  'headers': {
    'Authorization': `Bearer ${jwt}`
  }
})
```
