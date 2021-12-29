# Gestion Stock

An example of angular web app with nodejs back-end.

# Production Deployment

## Target description

In this documentation the production machine is a OVH VPS.
The back-end server serve the back-end API and the front-end application.
It is started with pm2.
It run behind a proxy nginx that maintains the https connection.

## Prerequisites

Open a root terminal on your production system.

### Identify your linux

Confirm your linux distribution:

```sh
$ lsb_release -a
No LSB modules are available.
Distributor ID: Debian
Description:    Debian GNU/Linux 10 (buster)
Release:        10
Codename:       buster
```

You can also use:

```sh
$ uname -a
Linux vps716174 4.19.0-13-cloud-amd64 #1 SMP Debian 4.19.160-2 (2020-11-28) x86_64 GNU/Linux
```

## Machine upgrade

If you use a Debian (or Debian derivates like Ubuntu), you should have the `apt` command to install and manage packages.

```sh
$ sudo apt update
$ sudo apt list --upgradable
$ sudo apt upgrade
```

May be some packages will not be upgraded because they are running (ex: ngninx, etc.). We will upgrade them later.

## Git installation

```sh
$ sudo apt install git
```

```sh
$ git --version
git version 2.20.1
```

## nginx (re)installation

### purge nginx

How to stop it:

```sh
sudo systemctl stop nginx
```

How to remove it:

```sh
$ sudo apt remove nginx
$ sudo apt remove nginx-full
# remove also the dependancies
$ sudo apt autoremove
```

How to purge the nginx configuration files:

```sh
rm -rf /etc/nginx
```

A linux system have services. Services are permanent processes running in background that are automatically launched when linux is starting. There is a utility called `systemctl` that manages the linux services.

How to remove nginx from `systemctl`:
https://superuser.com/questions/513159/how-to-remove-systemd-services

Checking the service list:

```sh
$ systemctl --type=service
```

### Reboot

```sh
$ systemctl reboot
```

### Install nginx

Source: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-debian-10

```sh
$ sudo apt install nginx
```

Check the status of the installation: Nginx should be started as a systemctl service.

```sh
$ sudo systemctl status nginx
```

You should see that the service is `Loaded` and `Active`

Get the IP address of your production machine:

```sh
$ ifconfig
```

or

```sh
hostname -I
```

Open a browser and go on your production site:

```
http://<ip-address>
```

Note that for the time being we do not use a firewall (the firewall software is `ufw`). This aspect will be considered later.

## Nodejs

Uninstall a previous node:

```sh
$ sudo apt remove nodejs
```

Install a new nodejs (ex: version 16 LTS)
https://github.com/nodesource/distributions/blob/master/README.md

```sh
# Using Debian, as root
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs
```

## PM2

Uninstall pm2:

```sh
# if pm2 is installed just remove the prod software from it.
$ pm2 delete all
$ npm uninstall -g pm2
$ cd
$ rm -rf .pm2
```

Install pm2

```sh
npm i -g pm2
```

# Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
