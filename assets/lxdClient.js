class LxdClient {

  url
  port = "8443"
  project = "default"

  constructor(url, port = "8443", project = "default") {
    this.url = url         //TODO Should be optional and default to window.location()
    this.port = port       //TODO Might be good, in certain conditions, to default to window.location()
    this.project = project //TODO
  }

  setProject(project){
      this.project = project
  }

  get(url, callback){
      let req = new XMLHttpRequest();
      req.addEventListener("load", callback);
      req.open("GET", `https://${this.url}:${this.port}/1.0` + url);
      req.withCredentials = true;
      req.send();
  }

  getResources(callback){
      this.get("/resources", callback)
  }

  getProjects(callback, recursion = 0){
      this.get("/projects", callback)
  }

  getInstances(callback, recursion = 0){
      let url = `/instances?project=${this.project}`
      if(recursion > 0){
          url += `&recursion=${recursion}`
      }

      this.get(url, callback)
  }
}
