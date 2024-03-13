export const signInEmailtemp = async (userEmail, hrefLink) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Back to Promptopia!</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin-top: 50px;
            margin-bottom: 50px;
        }

        table {
            border-collapse: collapse;
            max-width: 600px;
            margin: 0 auto;
        }

        h1 {
            font-size: 28px;
            margin-bottom: 0;
            color: #ffffff;
            text-align: center;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #555555;
        }

        .header {
            background-color: #4B0082; /* Changed color for returning users */
            border-radius: 10px 10px 0 0;
            padding: 20px;
        }

        .content {
            background-color: #ffffff;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        .footer {
            font-size: 14px;
            text-align: center;
            color: #cccccc;
            padding: 30px;
            background-color: #333744;
        }

        .footer a {
            color: #FDB45C;
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <td class="header">
                <h1>Welcome Back to Promptopia!</h1>
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Dear ${userEmail},</p>
                <p>We're thrilled to see you again! Your journey with Promptopia continues, and we're here to make it even more exciting. Dive back into creating, sharing, and exploring unique AI-powered prompts today.</p>
                <p>Have you checked out the latest features yet? Promptopia is constantly evolving, and we've introduced some amazing new tools and resources to enhance your experience.</p>
                <div style="text-align: center; margin-bottom: 20px;">
                    <a href="${hrefLink}" style="display: inline-block; padding: 12px 24px; background-color: #4B0082; color: #ffffff; text-decoration: none; border-radius: 30px; font-weight: bold; transition: background-color 0.3s ease;" target="_main">Explore Now</a>
                </div>
                <p>As always, if you have any questions or need assistance, feel free to reach out. Our support team is here to help you make the most out of Promptopia.</p>
                <p>Welcome back, and let your creativity flourish!</p>
                <p>Warmest regards,<br>The Promptopia Team</p>
            </td>
        </tr>
        <tr>
            <td class="footer content">
                This is an automated message, please do not reply.<br>
                Need help? Visit our <a href="${hrefLink}/support" target="_main">Support Center</a>.
            </td>
        </tr>
    </table>
</body>
</html>`;
