def serverContainer = null

pipeline {
    agent any
    environment {
        DOCKER_NETWORK = 'test-net'
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
                    def networkArg = "--network ${DOCKER_NETWORK}"
                    def runArgs = "-d -p 3000:3000 --name my-running-server ${networkArg}"
                    serverContainer = serverImage.run(runArgs)

                    docker.image('curlimages/curl:8.7.1').inside(networkArg) {
                        sh '''
                        echo "Waiting for 200 OK from http://my-running-server:3000 ..."
                        for i in $(seq 1 60); do
                          if curl -fs http://my-running-server:3000 > /dev/null; then
                            echo "Server is UP!"
                            exit 0
                          fi
                          sleep 2
                        done
                        echo "Timeout waiting for server" >&2
                        exit 1
                        '''
                    }
                }
            }
        }

        stage('Run Cypress Tests in Docker') {
            steps {
                script {
                    def cypressImage = docker.build('my-cypress-image', '-f Dockerfile.cypress .')
                    cypressImage.run("--network ${DOCKER_NETWORK}")
                }
            }
        }

        stage('Run Playwright Tests in Docker') {
            steps {
                script {
                    def pwImage = docker.build('my-playwright-image', '-f Dockerfile.playwright .')
                    pwImage.run("--network ${DOCKER_NETWORK}")
                }
            }
        }
    }

    post {
        always {
            script {
                if (serverContainer) {
                    echo 'Stopping and removing server container...'
                    sh "docker stop ${serverContainer.id} || true"
                    sh "docker rm ${serverContainer.id} || true"
                }
                sh "docker network rm ${DOCKER_NETWORK} || true"
            }
        }
    }
}