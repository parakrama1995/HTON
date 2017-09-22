//get HTML data
function getHTML() {
    clearData();
    positiveIntegerCheck("HTML");
}

//get JSON Data
function getJSON() {
    clearData();
    positiveIntegerCheck("JSON");
}

// get HTML Encoded data
function getHTMLEncoder() {
    clearData();
    positiveIntegerCheck("HTMLEncoder");
}

//Clear data on the browser
function clearData() {
    $("#Result").empty();
    $("#Time").empty();
}

//validate for positive integer
function positiveIntegerCheck(type) {
    let iterartionStr = document.getElementById("Iterations").value;
    let iterations = parseInt(iterartionStr);
    if (iterations <= 0 || iterartionStr === "") {
        alert("Please Enter a Positive Integer");
    }
    else {
        performIterations(type)
    }
}

//perform iteration requests as specified by the user's given number
function performIterations(type) {
    let iterations = parseInt(document.getElementById("Iterations").value);
    let totalTimeOfAllIterations = 0;

    for (i = 0; i < iterations; i++) {
        let startTime = new Date();
        getResponse(type);
        totalTimeOfAllIterations = totalTimeOfAllIterations + (new Date().getTime() - startTime.getTime());
    }

    $("#Time").html("Average Time per request= " + (totalTimeOfAllIterations / iterations) * 1000 + " micro seconds");
}

// send the request and get the response
function getResponse(type) {

    $.ajax({
        url: "../PHP/HTMLEncoder.php?type=" + type,
        success: function (result) {
            let process = new ProcessResult(type, result);
            process.processData();
        }
    });
}

// class for processing the result
class ProcessResult {

    // constructor for Process Result
    constructor(type, result) {
        this.type = type;
        this.result = result;
    }

    //append data to GUI
    appendData(data) {
        $("#Result").html(data);
    }

    //Process Data from the response
    processData() {
        if (this.type === "HTML") {
            this.appendData(this.result);
        }
        else if (this.type === "JSON") {

            let jsonData = JSON.parse(this.result);
            let htmlData =
                "<table>" +
                "<tr>" +
                "<th>Name</th>" +
                "<th>Age</th>" +
                "<th>City</th>" +
                "</tr><tr>" +
                "<td>" + jsonData["name"] + "</td>" +
                "<td>" + jsonData["age"] + "</td>" +
                "<td>" + jsonData["city"] + "</td>" +
                "</tr>" +
                "</table>";
            this.appendData(htmlData)
        }

    }

}