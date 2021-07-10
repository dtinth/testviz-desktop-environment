FROM dorowu/ubuntu-desktop-lxde-vnc:focal

RUN apt-get update && \
  apt-get install -y \
  kwin \
  git cmake ninja-build python2 build-essential \
  maven ffmpeg vim tmux unzip
RUN useradd -ms /bin/bash desktop -u 1000
RUN echo 'desktop ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
RUN sudo -u desktop -H /bin/bash -c "curl https://get.volta.sh | bash"
RUN sudo -u desktop -H /bin/bash -c "source ~/.profile; volta install node npm yarn"
COPY rootfs /
COPY home/desktop /root
COPY --chown=desktop:desktop home/desktop /home/desktop
RUN cd /etc/supervisor/conf.d && patch supervisord.conf supervisord.conf.patch