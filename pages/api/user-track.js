import Mixpanel from 'mixpanel'

export default function handler(req, res) {
    const { experimentName, variantName } = req.body
    const mixpanel = Mixpanel.init('1530cda4590279f1e0a7075fb15f0a0b');

    try {
        mixpanel.track(experimentName + " " + variantName, {
            name: experimentName,
            variant: variantName,
        });

        res.status(200).json({ status: 'Success' })
    } catch (error) {
        res.status(404).json({ status: 'failed' })
    }
}