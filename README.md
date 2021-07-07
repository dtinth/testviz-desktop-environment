```
docker-compose exec desktop bash
```

```
docker-compose exec desktop ffmpeg -video_size 1680x1080 -draw_mouse 0 -framerate 60 -f x11grab -i :1.0 -c:v libx264rgb -crf 0 -preset ultrafast /mnt/data/recordings/test.mkv -y
```

```js
{
  const { spawnSync } = require("child_process");
  function logEvent(...a) {
    spawnSync("/mnt/tools/logger/log.js", a);
  }
  this.rootHooks({
    beforeEach: /** @type Mocha.Func */ (
      async function () {
        logEvent("before", this.currentTest.titlePath().join(" :=> "));
      }
    ),
    afterEach: /** @type Mocha.Func */ (
      async function () {
        logEvent(
          "after",
          this.currentTest.titlePath().join(" :=> "),
          JSON.stringify({
            state: this.currentTest.state,
            pending: this.currentTest.pending,
            timedOut: this.currentTest.timedOut,
          })
        );
      }
    ),
  });
}
```