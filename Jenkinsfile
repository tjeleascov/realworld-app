pipeline {
  agent any

  stages {
    stage('Start local server') {
      steps {
        script {
          def serverImage = docker.build("my-server", "-f Dockerfile.server .")
          serverImage.withRun("-p 3000:3000") { c ->
            sh '''
              echo "Waiting for server to start..."
              until nc -z localhost 3000; do
                echo "Still waiting for server..."
                sleep 2
              done
            '''
          }
        }
      }
    }

    stage('Run Cypress Tests in Docker') {
      steps {
        script {
          def cypressImage = docker.build("my-cypress-image", "-f Dockerfile.cypress .")
          cypressImage.run()
        }
      }
    }

    stage('Run Playwright Tests in Docker') {
      steps {
        script {
          def pwImage = docker.build("my-playwright-image", "-f Dockerfile.playwright .")
          pwImage.run()
        }
      }
    }
  }
}
