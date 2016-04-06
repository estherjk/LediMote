# LediMote

Remote-controlled LEDs using Intel Edison and Node.js. [iOS](https://github.com/drejkim/LediMoteiOS) and [Android](https://github.com/drejkim/LediMoteAndroid) clients are also available.

The demo uses the JavaScript [MRAA](https://github.com/intel-iot-devkit/mraa) API to interface with Edison's IO. See [led-speech-edison](https://github.com/drejkim/led-speech-edison) for a Python example. The demo also uses [Socket.IO](http://socket.io) (WebSockets) to control the LEDs remotely.

Take a look at this [video](https://youtu.be/i61g4aYkrI0) to see it in action.

## Supplies

* [Intel Edison](https://www.sparkfun.com/products/13024)
* [SparkFun Base Block](https://www.sparkfun.com/products/13045)
* [SparkFun GPIO Block](https://www.sparkfun.com/products/13038) (solder headers, either male or female, to use the pins)
* 4 LEDs (red, green, blue, yellow)
* 4 330Ω resistors
* 4 1kΩ resistors
* [4 NPN transistors](https://www.sparkfun.com/products/521)
* Plenty of jumper wires

## Setting up Edison

If you haven't already, follow the [Getting Started](https://software.intel.com/iot/getting-started) instructions from Intel, then return to these instructions.

### Package manager configuration

Add [AlexT's unofficial opkg repository](http://alextgalileo.altervista.org/edison-package-repo-configuration-instructions.html). It contains many precompiled packages that can be installed by simply typing `opkg install <package name>`.

To configure the repository, add the following lines to `/etc/opkg/base-feeds.conf`:

```bash
src/gz all http://repo.opkg.net/edison/repo/all
src/gz edison http://repo.opkg.net/edison/repo/edison
src/gz core2-32 http://repo.opkg.net/edison/repo/core2-32
```

Update the package manager and install the first package we need:

```bash
opkg update
opkg install git
```

With `git` installed, we can now clone this repository onto Edison.

### Installing MRAA using Edison helper scripts

*Note: Newer versions of the Edison firmware may already have MRAA installed, so this step may be unnecessary.*

[edison-scripts](https://github.com/drejkim/edison-scripts) provides a set of scripts for simplifying some things on Edison. Although only one script is needed for this demo, it may be useful for future projects. To use it, do the following:

```bash
git clone https://github.com/drejkim/edison-scripts.git ~/edison-scripts

# Add ~/edison-scripts to PATH
echo 'export PATH=$PATH:~/edison-scripts' >> ~/.profile
source ~/.profile
```

Then, run the following:

```bash
# Install MRAA, the low level skeleton library for IO communication on Galileo, Edison, and other platforms
installMraa.sh
```

### Installing Node.js packages

* Navigate to `server`.
* Install the Node.js packages by typing `npm install`.

## The circuit

SparkFun [recommends](https://learn.sparkfun.com/tutorials/installing-libmraa-on-ubilinux-for-edison) using transistors to fully (and safely) light LEDs. To learn more about using transistors as switches, see this [tutorial](https://learn.sparkfun.com/tutorials/transistors/applications-i-switches).

**Note:** You can use the Edison Mini or Arduino Breakout boards. However, the pin mappings will differ. For more details, see this [tutorial](https://learn.sparkfun.com/tutorials/installing-libmraa-on-ubilinux-for-edison) from SparkFun.

### Wiring up the circuit

Shut down Edison and unplug it from power. Connect the LEDs to the GPIO block as shown:

![Schematic](https://raw.githubusercontent.com/drejkim/LediMote/master/images/schematic.png)

![Connections](https://raw.githubusercontent.com/drejkim/LediMote/master/images/connections.JPG)

**Important**: The direction of the LEDs and the transistors matter! For the LEDs, the anode (longer leg) connects to a 330Ω resistor, while the cathode (shorter leg) connects to the collector of the transistor. When the flat edge of a transistor is facing you, the order of the pins from left to right are as follows: emitter, base, and collector.

### Testing the circuit

To see if the LEDs are configured correctly:

* Navigate to `server`.
* Run the blink code by typing `node blink.js`.

The LEDs should blink on and off simultaneously.

## Running the demo

### Updating the WebSocket address

Modify `socket` in `web/app.js`. The section of the code looks like this:

```js
// MODIFY THIS WITH THE APPROPRIATE URL
var socket = io.connect('http://myedison.local:8080');
```

Replace `myedison` with the name of your Edison.

### Running the Node.js server

* Navigate to `server`.
* Run the server by typing `node server.js`.

The Node.js server should now be running. The console will look something like this:

```bash
HTTP server listening on port 8080
```

### Using the web client

Open a browser window and navigate to `http://myedison.local:8080`, where `myedison` is the name of your Edison. You should now be able to control the LEDs from the browser! If you are unable to access the page, make sure your PC is on the same WiFi network as your Edison.

### Using the iOS client

See [LediMoteiOS](https://github.com/drejkim/LediMoteiOS).

### Using the Android client

See [LediMoteAndroid](https://github.com/drejkim/LediMoteAndroid).
