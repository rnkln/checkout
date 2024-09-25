## Getting Started

```
npm run init  // Setup the local environment
npm run dev   // Run the development server
```

> http://localhost:3000/

## Parameters

<table style="width: 100%">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td valign="top">locale</td>
            <td>The locale that should be used for internationalization.<br><br><b>Values:</b> en | da | se | no</td>
        </tr>
        <tr>
            <td valign="top">method</td>
            <td>The preferred payment method which should be used.<br><br><b>Values:</b> applePay | mobilePay | card</td>
        </tr>
        <tr>
            <td valign="top">decimal</td>
            <td>The amount to initiate a payment with.<br><br><b>Example:</b> 100.01</td>
        </tr>
        <tr>
            <td valign="top">currency</td>
            <td>The currency to initiate a payment with.<br><br><b>Example:</b> DKK</td>
        </tr>
        <tr>
            <td valign="top">redirect</td>
            <td>The URL to redirect to when payment is successful.<br><br><b>Example:</b> https://example.com</td>
        </tr>
    </tbody>
</table>

## Cards

<table style="width: 100%">
    <thead>
        <tr>
            <th>Type</th>
            <th>Number</th>
            <th>Expiry</th>
            <th>CSC</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Mastercard</td>
            <td>5425233430109903</td>
            <td>12/2026</td>
            <td></td>
        </tr>
        <tr>
            <td>Visa</td>
            <td>4263982640269299</td>
            <td>02/2026</td>
            <td>837</td>
        </tr>
    </tbody>
</table>
