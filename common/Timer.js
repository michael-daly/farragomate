const EventEmitter = require ('~/EventEmitter.js');


class Timer
{
	constructor ()
	{
		this.timeLeft    = 0;
		this.currTimeout = null;
		this.events      = new EventEmitter ();
		this.isDeleted   = false;
	}

	delete ()
	{
		if ( this.isDeleted )
		{
			return;
		}

		this.stop ();
		this.events.clear ();

		delete this.timeLeft;
		delete this.currTimeout;
		delete this.events;

		this.isDeleted = true;
	}

	/**
	 * @param {Integer} [startTime=this.timeLeft]
	 */
	start ( startTime = this.timeLeft )
	{
		this.timeLeft = Math.round (startTime);

		if ( this.timeLeft > 0 )
		{
			this.events.emit ('start', this.timeLeft);
			this._tick ();
		}
	}

	/**
	 * @param {Integer} Seconds left in the timer.
	 */
	stop ()
	{
		clearTimeout (this.currTimeout);
		this.events.emit ('stop', this.timeLeft, true);

		return this.timeLeft;
	}

	/**
	 * @param {string}   event
	 * @param {Function} callback
	 */
	on ( event, callback )
	{
		this.events.on (event, callback);
	}

	/**
	 * @param {string}   event
	 * @param {Function} callback
	 */
	off ( event, callback )
	{
		this.events.off (event, callback);
	}

	_tick ()
	{
		this.events.emit ('tick', this.timeLeft);

		if ( this.timeLeft <= 0 )
		{
			clearTimeout (this.currTimeout);
			this.events.emit ('stop', this.timeLeft, false);
		}
		else
		{
			this.timeLeft--;
			this.currTimeout = setTimeout (this._tick.bind (this), 1000);
		}
	}
}


module.exports = Timer;
