def PROJECT = 'graphwiki-ui'
def API_PROJECT_GIT_REPOSITORY = 'https://github.com/opendatalabcz/graphwiki-api.git'
def UI_PROJECT_GIT_REPOSITORY = 'https://github.com/opendatalabcz/graphwiki-ui.git'
def GIT_CREDENTIALS = 'github_GregerTomas'

node {
  dir ('wrapper-dir') {
    dir ('api') {
        git(
            url: API_PROJECT_GIT_REPOSITORY,
            credentialsId: GIT_CREDENTIALS
        )

        stage('MVN package') {
            sh 'mvn clean package'
        }
    }

    dir ('ui') {
        git(
            url: UI_PROJECT_GIT_REPOSITORY,
            credentialsId: GIT_CREDENTIALS
        )

        stage('NPM install') {
            sh 'npm install'
        }

        stage('NPM build') {
            sh 'npm run build'
        }

        stage('DOCKER image') {
            sh "docker build -t ${PROJECT}-image ."
        }

        stage('DOCKER run container') {
            sh "docker container stop ${PROJECT}-container > /dev/null 2>&1 && echo \"Container stopped\" || echo \"Nothing to stop\""
            sh "docker container rm ${PROJECT}-container > /dev/null 2>&1 && echo \"Container removed\" || echo \"Nothing to remove\""
            sh "docker run --name ${PROJECT}-container -d -p 4200:80 ${PROJECT}-image"
        }
    }
  }
}
