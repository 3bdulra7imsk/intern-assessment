# Web Application Configuration

## Environment Configuration

The web application uses environment-based configuration for different deployment scenarios.

### Development Environment

- API URL: `http://localhost:3000`
- File: `web/src/environments/environment.ts`

### Production Environment

- API URL: Configurable via `window.API_URL` or defaults to production URL
- File: `web/src/environments/environment.prod.ts`

## Runtime Configuration

### Option 1: Modify index.html (Recommended)

Before deploying, update the `window.API_URL` value in `web/src/index.html`:

```javascript
// For production deployment
window.API_URL = 'https://your-api-domain.com';
```

### Option 2: Environment Variable (Build-time)

Set the API URL during the build process by modifying `environment.prod.ts`.

### Option 3: Runtime Override

After deployment, you can modify the built `index.html` file to change the API URL without rebuilding:

```html
<script>
  window.API_URL = 'https://your-new-api-url.com';
</script>
```

## Deployment Examples

### Docker Deployment

```dockerfile
# In your Dockerfile, you can replace the API URL at runtime
RUN sed -i 's|http://localhost:3000|https://your-api-domain.com|g' /app/index.html
```

### Kubernetes ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: web-config
data:
  config.js: |
    window.API_URL = 'https://api.your-domain.com';
```

### Environment-based Deployment

```bash
# Build for different environments
npm run build:dev    # Uses localhost:3000
npm run build:prod   # Uses production URL
```

## Available API Endpoints

All endpoints are prefixed with the configured API URL:

- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication  
- `GET /items` - Get protected items (requires Bearer token)

## Security Notes

- The application automatically includes Bearer tokens for protected endpoints
- Tokens are stored in localStorage with 8-hour expiration
- Invalid or expired tokens are automatically cleared