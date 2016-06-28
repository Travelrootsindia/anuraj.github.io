---
layout: post
title: "ASP.NET Core with Nginx as reverse proxy"
subtitle: "This post is about running your ASP.NET Core application with Nginx as reverse proxy on Windows. Nginx is a web server. It can act as a reverse proxy server for HTTP, HTTPS, SMTP, POP3, and IMAP protocols, as well as a load balancer and an HTTP cache. Nginx runs on Unix, Linux, BSD variants, OS X, Solaris, AIX, HP-UX, and Windows. Released under the terms of a BSD-like license, Nginx is free and open source software."
date: 2016-06-28 12:00
author: "Anuraj"
categories: [ASP.NET Core, Nginx, Reverse Proxy, Load balancing]
tags: [ASP.NET Core, Nginx, Reverse Proxy, Load balancing]
header-img: "img/post-bg-01.jpg"
---


Here is the minimal Nginx configuration to use with Kestrel. 

{% highlight Javascript %}
server {
    listen 8080;
    server_name 172.16.198.154;
    
    root /samplewebapp/wwwroot;

    location ~ \.(jpg|jpeg|gif|png|ico|css|zip|tgz|gz|rar|bz2|pdf|txt|tar|wav|bmp|rtf|js|flv|swf|html|htm|woff2|svg)$ {
        expires 1d;
        access_log off;
        add_header X-Static-File true;
    }

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Connection "";
        proxy_http_version 1.1;
    }
}
{% endhighlight %}

You can configure Nginx for load balancing web applications as well. Right now I am configuring Nginx to load balance ASP.NET Core applications running on top of Kestrel. You can do it with Docker as well. For this post I am running Kestrel on different port numbers and load balancing using Nginx default load balancing strategy (Round Robin), and here is the configuraion for load balancing.

{% highlight Javascript %}
upstream localhostapp {
	server 172.16.198.154:5000;
	server 172.16.198.154:5001;
	server 172.16.198.154:5002;
}

server {
	listen       8080;
	server_name  172.16.198.154;

	location / {
		proxy_pass http://localhostapp;
		proxy_set_header Connection keep-alive;
		proxy_set_header Host $host;
	}
}
{% endhighlight %}


Happy Programming :)
