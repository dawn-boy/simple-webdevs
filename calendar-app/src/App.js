import './app.css';
import { useState } from 'react';



function App() {

    const steps = [
        "Learn React",
        "Learn Next.js",
        "Build a company"
    ]
    const goals = [
        "Gym",
        "Calisthenics",
        "HIIT Training"
    ]

    const [ step, setStep ] = useState(0);
    const [ show, setShow ] = useState(true);
    const [ switchTab, setSwitchTab ] = useState(false);
    const [ tabName, setTabName ] = useState("Goals");

    const nextAction = e => {
        e.preventDefault();
        if(step < steps.length-1) setStep(prev => prev + 1);
        else setStep(0);
    }
    const prevAction = e => {
        e.preventDefault();
        if(step > 0) setStep(prev => prev - 1);
        else setStep(steps.length-1);
    }
    const switchAction = e => {
        e.preventDefault();
        setSwitchTab(prev => !prev);
        setTabName(prev => {
            if(prev === "Goals") setTabName("Steps");
            else setTabName("Goals");
        })
    }
    const showAction = e => {
        e.preventDefault();
        setShow(prev => !prev);
    }

    const [ stepsCount, setStepsCount ] = useState(0)
    const [ count, setCount ] = useState(0)

    const date = new Date('june 1 2025');
    date.setDate(date.getDate() + count);

  return (
      <div>
          <div className="header">
              {
                  show && ( <button className="switch-btn" onClick={switchAction}>{tabName}</button> )
              }
              <button className="close-btn" onClick={showAction}>&times;</button>
          </div>
          { show && switchTab &&
                  ( <div className="steps-tracker">
                          <div className="numbers">
                              <div className={ `number ${step >= 0 ? "active" : "" }` }>1</div>
                              <div className={ `number ${step >= 1 ? "active" : "" }` }>2</div>
                              <div className={ `number ${step >= 2 ? "active" : "" }` }>3</div>
                          </div>

                          <div className="message">
                              Step {step+1} <br /><br /> {steps[step]}
                          </div>

                          <div className="buttons">
                              <button className="action-btn" onClick={prevAction}>Previous</button>
                              <button className="action-btn" onClick={nextAction}>Next</button>
                          </div>
                    </div>
                  )
              }
          { show && !switchTab &&
              ( <div className="steps-tracker">
                      <div className="date-message">
                          {count === 0 ? "Today is " : count < 0 ? `${-count} days ago was ` : `${count} days from today is `}
                          <br />
                          <div className="date-txt">{date.toDateString()}</div>
                      </div>

                      <div className="change-btns-container">
                          <div className="change-btns">
                              <button className="change-btn" onClick={() => setStepsCount(prev => prev - 1) }>-</button>
                              <span className="change-txt">Step <span className="change-txt-main">{stepsCount}</span> </span>
                              <button className="change-btn" onClick={() => setStepsCount(prev => prev + 1)}>+</button>
                          </div>
                          <div className="change-btns">
                              <button className="change-btn" onClick={() => setCount(prev => prev-stepsCount)}>-</button>
                              <span className="change-txt">Count<span className="change-txt-main">{count}</span> </span>
                              <button className="change-btn" onClick={() => setCount(prev => prev+stepsCount)}>+</button>
                          </div>
                      </div>
                  </div>
              )
          }
      </div>
  )
}

export default App;
