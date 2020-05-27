# GraphWiki UI

Frontend for GraphWiki project. 



## User guide
See [final thesis](https://alfresco.fit.cvut.cz/share/proxy/alfresco/api/node/content/workspace/SpacesStore/42d34558-b22b-46b1-b418-6bc430e25b01).



## Getting Started

### Prerequisites
Following tools must be installed:

| Tool | Version |
| ------------- | ------------- |
| Node.js | 12.14.1 |
| npm | 6.13.4 |

For application configuration, see configuration files (*environment\*.ts*).



## Usage

### Install dependencies
```
npm install
```

### Build
```
npm run build
```

### Run
Application can be run with following environments:
* **local** - environment for development
```
npm start
```

* **production** - environment for VM deployment  
```
npm run start:production
```



## Deployment
See [Jenkinsfile](./Jenkinsfile) and [Dockerfile](./Dockerfile).



## License
See [license](./LICENSE).
