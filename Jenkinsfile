pipeline {
  agent any

  stages {
    stage('Start local server') {
      steps {
        sh 'yarn start'

        sh '''
          until nc -z localhost 3000; do
            echo "Waiting for server..."
            sleep 2
          done
        '''
      }
    }


    stage('Run Cypress Tests in Docker') {
      steps {
        script {
          def cypressImage = docker.build("my-cypress-image", "-f Dockerfile.cypress .")

          cypressImage.inside {
            sh 'npx cypress run'
          }
        }
      }
    }

    stage('Run Playwright Tests in Docker') {
      steps {
        script {
          def pwImage = docker.build("my-playwright-image", "-f Dockerfile.playwright .")

          pwImage.inside {
            sh 'npx playwright test'
          }
        }
      }
    }
  }
}
