from flask import Flask, render_template, url_for, redirect
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)


@app.route("/")
def learn_more():
    options = [
        {
            "text": "על חשיבות האלמוגים",
            "link": "reef_importance"
        },
        {
            "text": "על קצב ההשמדה",
            "link": "rate_of_reef_destruction"
        },
        {
            "text": "על השונית באילת",
            "link": "why_eilat"
        },
        {
            "text": "על פרוייקט המרפסות",
            "link": "why_eilat"

        }
    ]
    return render_template("index.html", options=options)


@app.route("/learn/reef-importance")
def reef_importance():
    return render_template("reef_importance.html")


@app.route("/learn/rate-of-destruction")
def rate_of_reef_destruction():
    group_precentage = ["35%", "15%", "10%", "20%", "20%"]
    return_instruction = "לחצו בכל מקום במעגל כדי לחזור"
    return render_template("reef_destruction.html", precentage=group_precentage, return_instruct=return_instruction)


@app.route("/learn/why-eilat")
def why_eilat():
    return render_template("why_eilat.html")

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)
