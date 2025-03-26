pipeline {
  agent any

  environment {
    EC2_USER = "ec2-user"
    EC2_HOST = "3.26.15.32"
    REMOTE_DIR = "/home/ec2-user/ifa-frontend"
    SSH_CREDENTIALS_ID = "ifa-ssh-key"
  }

  stages {

    stage('Trust GitHub Host') {
      steps {
        sh 'mkdir -p ~/.ssh && ssh-keyscan -t ed25519 github.com >> ~/.ssh/known_hosts'
      }
    }

    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Transfer Code to EC2') {
      steps {
        sshagent (credentials: ["${SSH_CREDENTIALS_ID}"]) {
          sh """
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "rm -rf ${REMOTE_DIR} && mkdir -p ${REMOTE_DIR}"
            scp -o StrictHostKeyChecking=no -r * ${EC2_USER}@${EC2_HOST}:${REMOTE_DIR}/
          """
        }
      }
    }

    stage('Start App on EC2') {
      steps {
        sshagent (credentials: ["${SSH_CREDENTIALS_ID}"]) {
          sh """
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
              cd ${REMOTE_DIR} &&
              npm install &&
              pm2 delete ifa-frontend || true &&
              pm2 start npm --name "ifa-frontend" -- run dev &&
              pm2 save
            '
          """
        }
      }
    }
  }

  post {
    success {
      echo '✅ Deployment to EC2 completed successfully!'
    }
    failure {
      echo '❌ Deployment failed. Please check the logs.'
    }
  }
}
