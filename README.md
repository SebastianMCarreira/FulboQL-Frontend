# FulboQL - Frontend

FulboQL is an application where a user can upload football players, managers, clubs and referees. Then the user can create matches to represent real-life matches and load the events of the match in real-time.

The kinds of events that cna be loaded are:
* Match Moments (start/ends of times/extra times)
* Restarts (kickoffs, freekicks, etc)
* Fouls (including perpetrator, victim and punishment)
* Highlights (free text input to denote miscellaneous events)
* Injuries
* Substitutions
* On Goals (including goalkeeper, assist, if it ended in a goal and if it was a penalty)

## Frontend

The frontend is a Vue.js app using Quasar.

### Instalation

Clone the Git respository and configure the environment and the API endpoint

~~~
git clone https://github.com/SebastianMCarreira/FulboQL-Frontend.git
cd FulboQL-Frontend
export FULBOQL_API_ENPOINT="<insert your api endpoint here>"
npm install
quasar dev
~~~

The app is now available at http://localhost:8080/


### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
