# Learn English

This project using [Angular CLI](https://github.com/angular/angular-cli) version 1.0.3.

###Setting up client config:

- Create file /src/assets/config.json
- Add configuration params (see an example for details)
- Example: {
             "GOOGLE_CLIENT_ID": "YOUR_CLIENT_ID",
             "FACEBOOK_CLIENT_ID": "YOUR_CLIENT_ID",
             "GITHUB_CLIENT_ID": "YOUR_CLIENT_ID",
             "HOST": "http://localhost:3000",
             "LOCAL_STORAGE_PREFIX": "app_",
             "OAUTH_PROXY": "https://auth-server.herokuapp.com/proxy" 
           }


###Setting up server config:

- Create file /server/.env
- Add configuration params (see an example)
- Example of config file:

PRIVATE_KEY = MY_PRIVATE_KEY
DB_NAME = learn_english
DB_PORT = 27017
DB_HOST = localhost
PORT = 3000

## MIT License

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
