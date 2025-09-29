pipeline {
    agent any

    environment {
        REGISTRY = credentials('docker-registry-url')
        DEPLOY_HOST = credentials('deploy-host')
        IMAGE_NAME = 'portfolio'
        ENV_BASE64 = credentials('portfolio_env_base64')
        PORT = '8088'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare Environment File') {
            steps {
                script {
                    sh 'echo "$ENV_BASE64" | base64 -d > .env'
                    sh 'echo "Environment file created successfully"'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        echo "Building Docker image..."
                        docker build -t \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER} .
                        docker tag \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER} \${REGISTRY}/\${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh """
                        echo "Pushing Docker images..."
                        docker push \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER}
                        docker push \${REGISTRY}/\${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    sshagent(['server2-ssh']) {
                        sh """
                            echo "Copying environment file..."
                            scp -o StrictHostKeyChecking=no .env root@\${DEPLOY_HOST}:/root/\${IMAGE_NAME}/.env

                            echo "Deploying container..."
                            ssh -o StrictHostKeyChecking=no root@\${DEPLOY_HOST} \\
                                "docker pull \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER} && \\
                                 docker stop \${IMAGE_NAME} 2>/dev/null || true && \\
                                 docker rm \${IMAGE_NAME} 2>/dev/null || true && \\
                                 docker run -d \\
                                     --name \${IMAGE_NAME} \\
                                     --restart unless-stopped \\
                                     --env-file /root/\${IMAGE_NAME}/.env \\
                                     -p \${PORT}:3000 \\
                                     \${REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER} && \\
                                 echo 'Deployment completed' && \\
                                 docker ps | grep \${IMAGE_NAME}"
                        """
                    }
                }
            }
        }

        stage('Cleanup Old Images') {
            steps {
                script {
                    sh """
                        echo "Cleaning up old Docker images..."
                        docker images \${REGISTRY}/\${IMAGE_NAME} --format "table {{.Tag}}" | \\
                        grep -E '^[0-9]+\$' | sort -rn | tail -n +4 | \\
                        xargs -I {} docker rmi \${REGISTRY}/\${IMAGE_NAME}:{} 2>/dev/null || true
                        
                        docker image prune -f
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build & Deploy thành công!'
            echo "🚀 App: http://${DEPLOY_HOST}:${PORT}"
        }
        failure {
            echo '❌ Pipeline lỗi!'
        }
    }
}
