## scpp is an intelliJ idea external tool which helps to scp your local file to a linux server

### Install

1. Open IntelliJ idea
2. Open menu :File -> Settings -> Tools -> External Tools
3. Click **add an external tool**:
![config a tool](http://youmoo.github.io/pages/images/scpp.png)

4. As for **Tool settings**, program is the file **sccp.sh** and parameters are **$FilePath$** and **$FileExt$**

5. Add a properties file, scpp.properties, to your module root:

![add props](http://youmoo.github.io/pages/images/scp-prop.png)

scpp.properties
```bash
# upload destination
serverPath='your_ssh_user_name@your_ssh_server:/data/project/qn1-web-webapp/code'
```

### Usage

Right click a js file in your project , choose menu : External Tools -> scpp.
In the console it  will print:

![console](http://youmoo.github.io/pages/images/scp-console.png)

You can check the scp'ed file from linux server now.
