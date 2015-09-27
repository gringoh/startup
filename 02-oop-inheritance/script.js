/**
 * This function succinctly implements the parasitic combination inheritance for us.
 * We pass in the parent object (or Super Class) and the child object (or Sub Class),
 * and the function does the parasitic combination inheritance:
 * makes the child object inherits from the parent object.
 */

function inheritPrototype(childObject, parentObject) {
	var copyOfParent = Object.create(parentObject.prototype);

	copyOfParent.constructor = childObject;

	childObject.prototype = copyOfParent;
};

/**
 * ObserverList: list of dependent Observers a subject may have
 */

function ObserverList() {
	this.observerList = [];
}

ObserverList.prototype = {
	add: function(obj) {
		return this.observerList.push(obj);
	},

	count: function() {
		return this.observerList.length;
	},

	get: function(index) {
		if(index > -1 && index < this.observerList.length) {
			return this.observerList[index];
		}
	},

	indexOf: function(obj, startIndex) {
		var i = startIndex;
		while(i < this.observerList.length) {
			if(this.observerList[i] === obj) {
				return i;
			}
			i++;
		}
		return -1;
	},

	removeAt: function(index) {
		this.observerList.splice(index, 1);
	}
};

/**
 * Subject: maintains a list of observers, facilitates adding or removing observers
 */

function Subject() {
	this.observers = new ObserverList();
}

Subject.prototype = {
	addObserver: function(observer) {
		console.log('adding Observer: ' + observer.getName());
		this.observers.add(observer);
	},

	removeObserver: function(observer) {
		this.observers.removeAt(this.observers.indexOf(observer, 0));
	},

	notifyStart: function(movieTitle) {
		var observerCount = this.observers.count();
		for(var i=0; i < observerCount; i++) {
			this.observers.get(i).playingMovie(movieTitle);
		}
	},

	notifyStop: function(movieTitle) {
		var observerCount = this.observers.count();
		for(var i=0; i < observerCount; i++) {
			this.observers.get(i).movieStopped(movieTitle);
		}
	}
};


/**
 * MovieObserver: representation of an Observer
 */

function MovieObserver(name) {
	this.name = name;
}

MovieObserver.prototype = {
	constructor: MovieObserver,

	playingMovie: function(movieTitle) {
		console.log(this.getName() + ': Playing ' + movieTitle + '...');
	},

	movieStopped: function(movieTitle) {
		console.log(this.getName() + ': Stopped ' + movieTitle + '...');
	},

	getName: function() {
		return this.name;
	}
}

/**
 * Movie: representation of a Movie
 */

function Movie() {
	Subject.call(this);
	this.attributes = {};

	this.play = function() {
		this.notifyStart(this.get('title'))
	},

	this.stop = function() {
		this.notifyStop(this.get('title'))
	},

	this.set = function(attr, value) {
		this.attributes[attr] = value;
	},

	this.get = function(attr) {
		return this.attributes[attr];
	}
};

inheritPrototype(Movie, Subject);

var fightClub = new Movie();
fightClub.set('title', 'Fight Club');
fightClub.set('year', '1999');
fightClub.set('director', 'David Fincher');

console.log('Movie: ' + fightClub.get('title'));
console.log('Year: ' + fightClub.get('year'));
console.log('Director: ' + fightClub.get('director'));

fightClub.addObserver(new MovieObserver('Observer A'));

console.log('----------------------------------');

var killBill = new Movie();
killBill.set('title', 'Kill Bill');
killBill.set('year', '2003');
killBill.set('director', 'Quentin Tarantino');

console.log('Movie: ' + killBill.get('title'));
console.log('Year: ' + killBill.get('year'));
console.log('Director: ' + killBill.get('director'));

console.log('----------------------------------');

var schoolOfRock = new Movie();
schoolOfRock.set('title', 'School of Rock');
schoolOfRock.set('year', '2003');
schoolOfRock.set('director', 'Richard Linklater');

console.log('Movie: ' + schoolOfRock.get('title'));
console.log('Year: ' + schoolOfRock.get('year'));
console.log('Director: ' + schoolOfRock.get('director'));

schoolOfRock.addObserver(new MovieObserver('Observer B'));

console.log('----------------------------------');

fightClub.play();
killBill.play();
schoolOfRock.play();

fightClub.stop();
killBill.stop();
schoolOfRock.stop();

console.log('----------------------------------');

function DownloadableMovie() {
	Movie.call(this);
	this.attributes = {};

	this.download = function() {
		console.log('now downloading movie: ' + this.get('title'));
	}
};

inheritPrototype(DownloadableMovie, Subject);

var theMatrix = new DownloadableMovie();
theMatrix.set('title', 'The Matrix');
theMatrix.set('year', '1999');
theMatrix.set('director', 'The Wachowskis');

console.log('Movie: ' + theMatrix.get('title'));
console.log('Year: ' + theMatrix.get('year'));
console.log('Director: ' + theMatrix.get('director'));

theMatrix.download();

theMatrix.addObserver(new MovieObserver('Observer C'));
theMatrix.play();
theMatrix.stop();

console.log('----------------------------------');

/**
 * Social: representation of Social functions
 */

function Social() { }

Social.prototype = {
	share: function (friendName) {
		console.log('Sharing ' + this.get('title') + ' with ' + friendName);
	},

	like: function () {
		console.log('You just liked ' + this.get('title'));
	}
};

Movie.prototype.share = Social.prototype.share;
Movie.prototype.like = Social.prototype.like;

var ironMan2 = new Movie();
ironMan2.set('title', 'Iron Man 2');
ironMan2.share('V. Rivas');