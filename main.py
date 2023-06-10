from flask import Flask, render_template, url_for, redirect
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/learn")
def learn_more():
    options = [
        {
            "text": "חשיבות האלמוגים",
            "link": "reef_importance"
        },
        {
            "text": "קצב ההשמדה",
            "link": "rate_of_reef_destruction"
        },
        {
            "text": "תחזית עתידית",
            "link": "reef_importance"
        },
        {
            "text": "השונית באילת",
            "link": "why_eilat"
        },
        {
            "text": "מה אפשר לעשות?",
            "link": "reef_importance"
        }
    ]
    return render_template("learn_more.html", options=options)


@app.route("/learn/reef-importance")
def reef_importance():
    return render_template("reef_importance.html")


@app.route("/learn/rate-of-destruction")
def rate_of_reef_destruction():
    return render_template("rate_of_reef_destruction.html")


@app.route("/learn/why-eilat")
def why_eilat():
    return render_template("why_eilat.html")

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)
