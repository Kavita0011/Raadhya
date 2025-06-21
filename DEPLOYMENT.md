# Deployment Guide for Raadhya Tantra

## Hugging Face Spaces Deployment

### Quick Deploy
1. Create new Space on Hugging Face
2. Set SDK to "Docker"
3. Upload these files:
   - `Dockerfile`
   - `app.py` (entry point)
   - All source code
4. Space will auto-build and deploy

### Configuration
- **Port**: 7860 (Hugging Face standard)
- **Memory**: 1GB recommended
- **Storage**: 1GB
- **Timeout**: 30 seconds

### Environment Variables
```
PORT=7860
NODE_ENV=production
```

## Docker Deployment

### Build Image
```bash
docker build -t raadhya-tantra .
```

### Run Container
```bash
docker run -p 7860:7860 raadhya-tantra
```

### Health Check
```bash
curl http://localhost:7860/api/security/stats
```

## Production Checklist

- [x] Security testing (96% pass rate)
- [x] Performance optimization
- [x] Error handling
- [x] Health checks
- [x] Docker configuration
- [x] Documentation
- [x] Divine protection active

## Monitoring

The application includes built-in monitoring:
- Security threat detection
- Performance metrics  
- Health endpoints
- Divine guidance analytics

## Scaling

For high traffic:
1. Enable horizontal scaling
2. Add load balancer
3. Configure session clustering
4. Monitor divine protection metrics