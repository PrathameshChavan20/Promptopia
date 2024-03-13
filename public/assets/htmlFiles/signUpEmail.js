export const signUpEmailtemp = async (userEmail, hrefLink) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Promptopia!</title>
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
            background-color: #9370DB;
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
            /* Footer background color */
        }

        .footer a {
            color: #FDB45C;
            /* Color for footer links */
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <td class="header">
                <h1>Welcome to Promptopia!</h1>
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Dear ${userEmail},</p>
                <p>Thank you for joining Promptopia, the ultimate platform for creating and sharing prompts for AI
                    models. We're thrilled to have you on board and can't wait for you to explore the boundless
                    possibilities of AI-powered prompts.</p>
                <p>Promptopia is a vibrant community where you can unleash your creativity, collaborate with like-minded
                    individuals, and experience the magic of AI. Whether you're a seasoned prompt creator or just
                    starting out, our platform offers a wide range of tools and resources to help you craft captivating
                    prompts.</p>
                <div style="text-align: center; margin-bottom: 20px;">
                    <a href="${hrefLink}" style="display: inline-block;
                    padding: 12px 24px;
                    background-color: #9370DB;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 30px;
                    font-weight: bold;
                    transition: background-color 0.3s ease;  background-color: #7B68EE;" target="_main">Get Started</a>
                </div>
                <p>If you have any questions or need assistance, our friendly support team is always here to help.
                    Simply reply to this email, and we'll get back to you as soon as possible.</p>
                <p>Welcome aboard, and happy prompting!</p>
                <p>Best regards,<br>The Promptopia Team</p>
            </td>
        </tr>
        <tr>
            <td class="footer content">
                This is an automated message, please do not reply.<br>
                If you need assistance, please contact us through our <a href="${hrefLink}/support"
                    target="_main">Support Link<a />
            </td>
        </tr>
    </table>
</body>

</html>
`;
