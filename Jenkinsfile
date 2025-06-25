def serverContainer = null

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
            def serverImage = docker.build('my-server', '-f Dockerfile.server .')
            serverContainer = serverImage.run("-d --name my-running-server -p 3000:3000")

            def ip = sh(returnStdout: true,
                        script: "docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${serverContainer.id}").trim()

            sh """
                echo "Container IP: ${ip}"
                for i in {1..30}; do
                  if curl -fs http://${ip}:3000/ > /dev/null; then
                    echo 'Server is UP!'
                    exit 0
                  fi
                  echo 'Waiting…'; sleep 2
                done
                echo 'Timeout waiting for server' >&2
                exit 1
            """
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
