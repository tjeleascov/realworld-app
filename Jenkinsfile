pipeline {
  agent any
  environment {
    DOCKER_NETWORK = "test-net"
  }
  stages {
    stage('Cleanup Workspace') {
      steps {
        cleanWs()
        sh 'rm -rf .git || true'
      }
    }

    stage('Checkout') {
      steps {
        git url: 'https://github.com/tjeleascov/realworld-app.git',
            branch: 'master',
            credentialsId: 'github-creds'
      }
    }

    stage('Prepare Docker Network') {
      steps {
        script {
          sh "docker network create ${DOCKER_NETWORK} || true"
        }
      }
    }

    stage('Start local server') {
      steps {
        script {
          def serverImage = docker.build("my-server", "-f Dockerfile.server .")
          serverContainer = serverImage.run("-d --network ${DOCKER_NETWORK}")
          sh '''
            echo "Waiting for server to start on port 3000..."
            sleep 5
            until nc -z 127.0.0.1 3000; do
              echo "Still waiting..."
              sleep 2
            done
            echo "Server is up!"
          '''
        }
      }
    }

    stage('Run Cypress Tests in Docker') {
      steps {
        script {
          def cypressImage = docker.build("my-cypress-image", "-f Dockerfile.cypress .")
          cypressImage.run("--network ${DOCKER_NETWORK}")
        }
      }
    }

    stage('Run Playwright Tests in Docker') {
      steps {
        script {
          def pwImage = docker.build("my-playwright-image", "-f Dockerfile.playwright .")
          pwImage.run("--network ${DOCKER_NETWORK}")
        }
      }
    }
  }

  post {
    always {
      script {
        if (serverContainer) {
          echo "Stopping server container..."
          serverContainer.stop()
        }
      }
    }
  }
}