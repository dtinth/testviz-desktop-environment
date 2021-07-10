Based on <https://github.com/fcwu/docker-ubuntu-vnc-desktop>

## Commands

### Desktop

Entering a shell:

```
docker-compose exec desktop bash
```

Recording a screencast (lossless):

```
docker-compose exec desktop ffmpeg -video_size 1680x1080 -draw_mouse 0 -framerate 60 -f x11grab -i :1.0 -c:v libx264rgb -crf 0 -preset ultrafast /mnt/data/recordings/test.mkv -y
```

Recording a screencast (lossy):

```
docker-compose exec desktop ffmpeg -video_size 1680x1080 -draw_mouse 0 -framerate 60 -f x11grab -i :1.0 -c:v libx264 -crf 18 -preset ultrafast /mnt/data/recordings/test.mkv -y
```

### Reload supervisor

```
supervisorctl reread
supervisorctl update
```

## Instrumentation scripts

### Mocha on Node.js

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

### Mocha on web browser

```js
{
  async function logEvent(...a) {
    await fetch('http://localhost:1230', {
      method: 'POST',
      body: JSON.stringify(a),
    }).catch(e => {
      console.error(e);
    });
  }
  beforeEach(async function () {
    await logEvent('before', this.currentTest.titlePath().join(' :=> '));
  });
  afterEach(async function () {
    await logEvent(
      'after',
      this.currentTest.titlePath().join(' :=> '),
      JSON.stringify({
        state: this.currentTest.state,
        pending: this.currentTest.pending,
        timedOut: this.currentTest.timedOut,
      }),
    );
  });
}
```

### JUnit

```java
package dtinth;
 
import org.junit.runner.Description;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;
import org.junit.runner.notification.RunListener;
 
public class MyRunListener extends RunListener
{
    /**
     * Called before any tests have been run.
     * */
    public void testRunStarted(Description description) throws java.lang.Exception
    {
        Runtime.getRuntime().exec(new String[]{
            "/mnt/tools/logger/log.js",
            "run-start",
            description.getClassName() + " :=> " +
            description.getMethodName() + " :=> " +
            description.getDisplayName()
        });
    }
 
    /**
     *  Called when all tests have finished
     * */
    public void testRunFinished(Result result) throws java.lang.Exception
    {
        Runtime.getRuntime().exec(new String[]{
            "/mnt/tools/logger/log.js",
            "run-finish"
        });
    }
 
    /**
     *  Called when an atomic test is about to be started.
     * */
    public void testStarted(Description description) throws java.lang.Exception
    {
        Runtime.getRuntime().exec(new String[]{
            "/mnt/tools/logger/log.js",
            "before",
            description.getClassName() + " :=> " +
            description.getMethodName() + " :=> " +
            description.getDisplayName()
        });
    }
 
    /**
     *  Called when an atomic test has finished, whether the test succeeds or fails.
     * */
    public void testFinished(Description description) throws java.lang.Exception
    {
        Runtime.getRuntime().exec(new String[]{
            "/mnt/tools/logger/log.js",
            "after",
            description.getClassName() + " :=> " +
            description.getMethodName() + " :=> " +
            description.getDisplayName()
        });
    }
 
    /**
     *  Called when an atomic test fails.
     * */
    public void testFailure(Failure failure) throws java.lang.Exception
    {
        Description description = failure.getDescription();
        Runtime.getRuntime().exec(new String[]{
            "/mnt/tools/logger/log.js",
            "failed",
            description.getClassName() + " :=> " +
            description.getMethodName() + " :=> " +
            description.getDisplayName(),
            failure.getMessage()
        });
    }
 
    /**
     *  Called when a test will not be run, generally because a test method is annotated with Ignore.
     * */
    public void testIgnored(Description description) throws java.lang.Exception
    {
        Runtime.getRuntime().exec(new String[]{
            "/mnt/tools/logger/log.js",
            "ignored",
            description.getClassName() + " :=> " +
            description.getMethodName() + " :=> " +
            description.getDisplayName()
        });
    }
}
```