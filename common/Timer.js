const EventEmitter = require ('~/EventEmitter.js');


class Timer
{
	constructor ()
	{
		this.timeLeft    = 0;
		this.currTimeout = null;
		this.events      = new EventEmitter ();
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
			this.tick ();
		}
	}

	tick ()
	{
		if ( this.timeLeft <= 0 )
		{
			clearTimeout (this.currTimeout);
			this.events.emit ('stop', this.timeLeft, false);
		}
		else
		{
			this.events.emit ('tick', this.timeLeft);
			this.currTimeout = setTimeout (this.tick.bind (this), 1000);

			this.timeLeft--;
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
}


module.exports = Timer;
