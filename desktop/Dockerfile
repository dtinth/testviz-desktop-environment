FROM dorowu/ubuntu-desktop-lxde-vnc:focal

RUN apt-get update && \
  apt-get install -y \
  git cmake ninja-build python2 build-essential libgl1-mesa-dev libglu1-mesa-dev libegl1-mesa-dev libgles2-mesa-dev \
  maven \
  ffmpeg
RUN useradd -ms /bin/bash desktop -u 1000
RUN echo 'desktop ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
# COPY rootfs /
COPY home/desktop /root
COPY --chown=desktop:desktop home/desktop /home/desktop