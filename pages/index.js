import { Experiment, Variant, emitter, experimentDebugger } from '@marvelapp/react-ab-test';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import axios from 'axios'

mixpanel.init("NEXT_PUBLIC_MIXPANEL_TOKEN");

experimentDebugger.enable();
emitter.defineVariants('navbarButtonExperiment', ['button-one', 'button-two'], [50, 50]);

export default function Home() {

    const onButtonClick = () => {
        emitter.emitWin('navbarButtonExperiment');
    }

    useEffect(() => {
        // Called when the experiment is displayed to the user.
        emitter.addPlayListener(function(experimentName, variantName) {
            console.log(`Displaying experiment ${experimentName} variant ${variantName}`);
        });


        // Called when a 'win' is emitted, in this case by this.refs.experiment.win()
        emitter.addWinListener(function(experimentName, variantName) {
            console.log(
                `Variant ${variantName} of experiment ${experimentName} was clicked`
            );

            axios.post('/api/user-track', { experimentName, variantName, experimentName }).then(() => {
                alert('data sent!')
            }).catch(err => {
                alert('failed to send data')
            })
        });
    })

    return (
        <div>
            <h1>Nextjs Split Testing</h1>
            <Experiment name='navbarButtonExperiment'>
                <Variant name='button-one'>
                    <button onClick={() => onButtonClick()}>Button 1</button>
                </Variant>
                <Variant name='button-two'>
                    <button onClick={() => onButtonClick()}>Button 2</button>
                </Variant>
            </Experiment>
        </div>
    )
}
