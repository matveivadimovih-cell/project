export class EventEmitter
{
    constructor()
    {
        this.events = {};
    }

    on(eventName, callback)
    {
        if(callback == null)
        {
            return;
        }

        if(!this.events[eventName])
        {
            this.events[eventName] = [];
        }

        if(!this.events[eventName].includes(callback))
        {
            this.events[eventName].push(callback);
        }

        return () => this.off(eventName, callback);
    }

    once(eventName, callback)
    {
        const wrapper = (data) => {
            try
            {
                callback(data);
            } 
            finally
            {
                this.off(eventName, wrapper);
            }
        };

        this.on(eventName, wrapper);

        return () => {
            this.off(eventName, wrapper);
        };
    }
    
    off(eventName, callback)
    {
        if(this.events[eventName])
        {
            const index = this.events[eventName].indexOf(callback);
            if(index !== -1)
            {
                this.events[eventName].splice(index, 1);
            }

            if(this.events[eventName].length === 0)
            {
                delete this.events[eventName];
            }
        }
    }

    offAll(eventName = null)
    {
        if(this.events[eventName])
        {
            delete this.events[eventName];
        }
        else if(eventName === null)
        {
            this.events = {};
        }
    }

    emit(eventName, data)
    {
        const event = this.events[eventName];
        if(event)
        {
            [...event].forEach(callback => 
            {
                try
                {
                    callback(data);
                }
                catch(err)
                {
                    console.error(`Error in ${eventName}:`, err);
                }
            });
            return true;
        }
        return false;
    }
}