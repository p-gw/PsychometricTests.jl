var documenterSearchIndex = {"docs":
[{"location":"api/","page":"API","title":"API","text":"CurrentModule = PsychometricTests","category":"page"},{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/#Types-/-Constructors","page":"API","title":"Types / Constructors","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"PsychometricTest\nPsychometricTest(::AbstractVector{<:Item}, ::AbstractVector{<:Person}, ::AbstractVector{<:Response})\nPsychometricTest(::AbstractMatrix)\nPsychometricTest(::Any)\nItem\nPerson\nResponse\nBasicItem\nBasicPerson\nBasicResponse\nMatrix","category":"page"},{"location":"api/#PsychometricTests.PsychometricTest","page":"API","title":"PsychometricTests.PsychometricTest","text":"PsychometricTest{I<:Item,P<:Person,R<:Response,IIT,PIT,ZT}\n\nA struct representing a psychometric test.\n\nFields\n\nitems: A vector of unique items.\npersons: A vector of unique persons.\nresponses: A vector of responsese.\nitem_ptr: A dictionary of key-value-pairs mapping the unique item identifier to responses.\nperson_ptr: A dictionary of key-value-pairs mapping the unique person identifier to responses.\nzeroval: The zero value for the responses in matrix form (see Details).\n\nDetails\n\nPsychometricTest stores the person by item response matrix as a coordinate list, allowing for a common data structure for both dense (all persons respond to the same items) and sparse tests (persons respond to (a subset of) different items, e.g. test equating). For sparse tests or tests with missing responses, zeroval determines the value of the missing responses when reconstructing the response matrix via Matrix.\n\nConstruction\n\nAt construction item and person pointers are precomputed to allow efficient lookup of responses for both items and persons.\n\nwarning: Warning\nIt is required that all item ids in items as well as person ids in person are unique! Otherwise an ArgumentError is thrown.\n\n\n\n\n\n","category":"type"},{"location":"api/#PsychometricTests.PsychometricTest-Tuple{AbstractVector{<:Item}, AbstractVector{<:Person}, AbstractVector{<:Response}}","page":"API","title":"PsychometricTests.PsychometricTest","text":"PsychometricTest(items, persons, responses)\n\nConstruct a psychometric test from a vector of items, a vector of persons, and a vector of responses.\n\nwarning: Warning\nIt is required that all item ids in items as well as person ids in person are unique! Otherwise an ArgumentError is thrown.\n\nExamples\n\njulia> items = [BasicItem(i) for i in 1:3];\n\njulia> persons = [BasicPerson(p) for p in 1:2];\n\njulia> responses = vec([BasicResponse(i, p, rand(0:1)) for i in 1:3, p in 1:2]);\n\njulia> test = PsychometricTest(items, persons, responses)\nA PsychometricTest with 6 BasicResponse{Int64, Int64, Int64} from 2 BasicPerson{Int64} and 3 BasicItem{Int64}\n\n\n\n\n\n\n","category":"method"},{"location":"api/#PsychometricTests.PsychometricTest-Tuple{AbstractMatrix}","page":"API","title":"PsychometricTests.PsychometricTest","text":"PsychometricTest(data::AbstractMatrix)\n\nConstruct a psychometric test from a response matrix.\n\nId variables for persons and items are derived from the row number and column number respectively.\n\nExamples\n\njulia> response_data = rand(0:1, 5, 3);\n\njulia> test = PsychometricTest(response_data)\nA PsychometricTest with 15 BasicResponse{Int64, Int64, Int64} from 5 BasicPerson{Int64} and 3 BasicItem{Int64}\n\n\n\n\n\n\n","category":"method"},{"location":"api/#PsychometricTests.PsychometricTest-Tuple{Any}","page":"API","title":"PsychometricTests.PsychometricTest","text":"PsychometricTest(table, item_vars = Tables.columnnames(table), id_var = nothing)\n\nConstruct a psychometric test from a Tables.jl compatible table.\n\nIf only a column subset of table is to be included in the resulting test, specify a vector of column names in item_vars. The unique item identifier then corresponds to the column name of the table.\n\nid_var is used to determine the unique person identificators. If id_var = nothing (the default), the person id is an integer index corresponding to the table row.\n\nExamples\n\nFrom DataFrame with default settings\n\njulia> using DataFrames\n\njulia> response_data = DataFrame(Item1 = [1, 0, 1], Item2 = [0, 0, 1]);\n\njulia> test = PsychometricTest(response_data)\nA PsychometricTest with 6 BasicResponse{Symbol, Int64, Int64} from 3 BasicPerson{Int64} and 2 BasicItem{Symbol}\n\n\nFrom a subset of a DataFrame\n\njulia> using DataFrames\n\njulia> response_data = DataFrame(Item1 = [1, 0, 1], Item2 = [0, 0, 1], Item3 = [1, 1, 1]);\n\njulia> test = PsychometricTest(response_data, [:Item1, :Item3])\nA PsychometricTest with 6 BasicResponse{Symbol, Int64, Int64} from 3 BasicPerson{Int64} and 2 BasicItem{Symbol}\n\n\nFrom a DataFrame with custom id variable\n\njulia> using DataFrames\n\njulia> response_data = DataFrame(id = [:a, :b, :c], Item1 = [1, 0, 1], Item2 = [0, 0, 1]);\n\njulia> test = PsychometricTest(response_data, [:Item1, :Item2], :id)\nA PsychometricTest with 6 BasicResponse{Symbol, Symbol, Int64} from 3 BasicPerson{Symbol} and 2 BasicItem{Symbol}\n\n\n\n\n\n\n","category":"method"},{"location":"api/#PsychometricTests.Item","page":"API","title":"PsychometricTests.Item","text":"Item\n\nAn abstract type representing an item in a psychometric test.\n\nEvery implementation T <: Item must define the following interface:\n\ngetid: Get the unique item identifier.\n\n\n\n\n\n","category":"type"},{"location":"api/#PsychometricTests.Person","page":"API","title":"PsychometricTests.Person","text":"Person\n\nAn abstract type representing a person in a psychometric test.\n\nEvery implementation T <: Person must define the following interface:\n\ngetid: Get the unique person identifier.\n\n\n\n\n\n","category":"type"},{"location":"api/#PsychometricTests.Response","page":"API","title":"PsychometricTests.Response","text":"Response\n\nAn abstract type representing a response in a psychometric test.\n\nEvery implementation of T <: Response must define the following interface:\n\ngetvalue: Get the response value.\ngetitemid: Get the item id.\ngetpersonid: Get the person id.\n\n\n\n\n\n","category":"type"},{"location":"api/#PsychometricTests.BasicItem","page":"API","title":"PsychometricTests.BasicItem","text":"BasicItem{I} <: Item\n\nA minimal implementation of Item. Contains no information besides a unique id of type I.\n\n\n\n\n\n","category":"type"},{"location":"api/#PsychometricTests.BasicPerson","page":"API","title":"PsychometricTests.BasicPerson","text":"BasicPerson{I} <: Person\n\nA minimal implementation of Person. Contains no information besides a unique id of type I.\n\n\n\n\n\n","category":"type"},{"location":"api/#PsychometricTests.BasicResponse","page":"API","title":"PsychometricTests.BasicResponse","text":"BasicResponse{IIT,PIT,T}\n\nA minimal implementation of Response. Contains an item id item_id::IIT, person id person_id::PIT and a response value value::T.\n\n\n\n\n\n","category":"type"},{"location":"api/#Base.Matrix","page":"API","title":"Base.Matrix","text":"Matrix(test::PsychometricTest)\n\nGet the person by item response matrix from test.\n\nExamples\n\njulia> response_data = [0 1 0; 1 0 0; 0 0 1];\n\njulia> test = PsychometricTest(response_data);\n\njulia> Matrix(test)\n3×3 Matrix{Int64}:\n 0  1  0\n 1  0  0\n 0  0  1\n\njulia> Matrix(test) == response_data\ntrue\n\n\n\n\n\n\n","category":"type"},{"location":"api/#Accessors","page":"API","title":"Accessors","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"getitems\ngetpersons\ngetresponses\ngetvalue\ngetid\ngetitemid\ngetpersonid\nnitems\nnpersons\nnresponses","category":"page"},{"location":"api/#PsychometricTests.getitems","page":"API","title":"PsychometricTests.getitems","text":"getitems(test::PsychometricTest)\n\nGet the vector of items of a psychometric test.\n\nExamples\n\njulia> data = rand(0:1, 3, 2);\n\njulia> test = PsychometricTest(data);\n\njulia> getitems(test)\n2-element Vector{BasicItem{Int64}}:\n BasicItem{Int64}(1)\n BasicItem{Int64}(2)\n\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.getpersons","page":"API","title":"PsychometricTests.getpersons","text":"getpersons(test::PsychometricTest)\n\nGet the vector of persons of a psychometric test.\n\nExamples\n\njulia> data = rand(0:1, 3, 2);\n\njulia> test = PsychometricTest(data);\n\njulia> getpersons(test)\n3-element Vector{BasicPerson{Int64}}:\n BasicPerson{Int64}(1)\n BasicPerson{Int64}(2)\n BasicPerson{Int64}(3)\n\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.getresponses","page":"API","title":"PsychometricTests.getresponses","text":"getresponses(test::PsychometricTest)\n\nGet the vector of responses of a psychometric test.\n\nExamples\n\njulia> data = [0 0 1; 1 0 1];\n\njulia> test = PsychometricTest(data);\n\njulia> getresponses(test)\n6-element Vector{BasicResponse{Int64, Int64, Int64}}:\n BasicResponse{Int64, Int64, Int64}(1, 1, 0)\n BasicResponse{Int64, Int64, Int64}(1, 2, 1)\n BasicResponse{Int64, Int64, Int64}(2, 1, 0)\n BasicResponse{Int64, Int64, Int64}(2, 2, 0)\n BasicResponse{Int64, Int64, Int64}(3, 1, 1)\n BasicResponse{Int64, Int64, Int64}(3, 2, 1)\n\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.getvalue","page":"API","title":"PsychometricTests.getvalue","text":"getvalue(response::Response)\n\nGet the response value of response.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.getid","page":"API","title":"PsychometricTests.getid","text":"getid(item::Item)\n\nGet the unique item identifier of item.\n\n\n\n\n\ngetid(person::Person)\n\nGet the unique person identifier of person.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.getitemid","page":"API","title":"PsychometricTests.getitemid","text":"getitemid(response::Response)\n\nGet the unique item id of response.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.getpersonid","page":"API","title":"PsychometricTests.getpersonid","text":"getpersonid(response::Response)\n\nget the unique person id of response.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.nitems","page":"API","title":"PsychometricTests.nitems","text":"nitems(test::PsychometricTest)\n\nGet the number of items in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.npersons","page":"API","title":"PsychometricTests.npersons","text":"npersons(test::PsychometricTest)\n\nGet the number of persons in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.nresponses","page":"API","title":"PsychometricTests.nresponses","text":"nresponses(test::PsychometricTest)\n\nGet the number of responses in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#Iterators","page":"API","title":"Iterators","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"eachitem\neachperson\neachresponse","category":"page"},{"location":"api/#PsychometricTests.eachitem","page":"API","title":"PsychometricTests.eachitem","text":"eachitem(test::PsychometricTest)\n\nIterate over each item in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.eachperson","page":"API","title":"PsychometricTests.eachperson","text":"eachperson(test::PsychometricTest)\n\nIterate over each person in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.eachresponse","page":"API","title":"PsychometricTests.eachresponse","text":"eachresponse(test::PsychometricTest)\n\nIterate over each response in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#Descriptive-Statistics","page":"API","title":"Descriptive Statistics","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"itemmean\nitemmeans\nitemscore\nitemscores\npersonmean\npersonmeans\npersonscore\npersonscores","category":"page"},{"location":"api/#PsychometricTests.itemmean","page":"API","title":"PsychometricTests.itemmean","text":"itemmean(test::PsychometricTest, id)\n\nCalculate the mean score for item with identifier id in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.itemmeans","page":"API","title":"PsychometricTests.itemmeans","text":"itemmeans(test::PsychometricTest)\n\nCalculate the mean scores for each item in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.itemscore","page":"API","title":"PsychometricTests.itemscore","text":"itemscore(test::PsychometricTest, id)\n\nCalculate the total score for item with identifier id in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.itemscores","page":"API","title":"PsychometricTests.itemscores","text":"itemscores(test::PsychometricTest)\n\nCalculate the total score for each item in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.personmean","page":"API","title":"PsychometricTests.personmean","text":"personmean(test::PsychometricTest, id)\n\nCalculate the mean score for person with identifier id in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.personmeans","page":"API","title":"PsychometricTests.personmeans","text":"personmeans(test::PsychometricTest)\n\nCalculate the mean scores for each person in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.personscore","page":"API","title":"PsychometricTests.personscore","text":"personscore(test::PsychometricTest, id)\n\nCalculate the total score for person with identifier id in test.\n\n\n\n\n\n","category":"function"},{"location":"api/#PsychometricTests.personscores","page":"API","title":"PsychometricTests.personscores","text":"personscores(test::PsychometricTest)\n\nCalculate the total scores for each person in test.\n\n\n\n\n\n","category":"function"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"CurrentModule = PsychometricTests","category":"page"},{"location":"extending_types/#Extending-Types","page":"Extending Types","title":"Extending Types","text":"","category":"section"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"While PsychometricTests.jl implements minimal versions for test components with  BasicItem, BasicPerson, and BasicResponse, more compex use cases might require extensions of these basic components.  In this example we will create a psychometric test that not only includes variables on the person level, but also response times for the item responses. The resulting PsychometricTest stores the required information and has the capability to analyse response times.","category":"page"},{"location":"extending_types/#Adding-Person-variables","page":"Extending Types","title":"Adding Person variables","text":"","category":"section"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"In a first step we add additional variables to the persons field of the psychometric test.  For this we need to create a new struct that inherits from Person. This struct contains the persons anger score in an anger field.  Additionally the interface definition of Person requires us to add a unique identifier for each person. We include this in an id field of the struct.","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"using PsychometricTests\n\nstruct AngryPerson{T} <: Person\n    id::T\n    anger::Int\nend","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"To satisfy the Person interface, we also need to implement a getid function for our newly defined AngryPerson.","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"PsychometricTests.getid(person::AngryPerson) = person.id","category":"page"},{"location":"extending_types/#Adding-response-times","page":"Extending Types","title":"Adding response times","text":"","category":"section"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"The second step in this example is to add response times to BasicResponse. Similarly to adding the person variables we create a struct inheriting from Response and  implement the required interface. The new TimedResponse has additional start_time and  end_time variables that can be used to calculate the response times. ","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"using Dates\n\nstruct TimedResponse{IIT,PIT,T} <: Response\n    item_id::IIT\n    person_id::PIT\n    value::T\n    start_time::DateTime\n    end_time::DateTime\nend","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"The interface for Response requires implemtation of getvalue,  getitemid, and getpersonid. ","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"PsychometricTests.getvalue(response::TimedResponse) = response.value\nPsychometricTests.getitemid(response::TimedResponse) = response.item_id\nPsychometricTests.getpersonid(response::TimedResponse) = response.person_id","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"Additionally we want to be able to get the response time for a given response, so we define a custom response_time function. ","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"response_time(response::TimedResponse) = response.end_time - response.start_time","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"This concludes the type definition section of this example. Next, we will move on to constructing the psychometric test.","category":"page"},{"location":"extending_types/#Constructing-the-test","page":"Extending Types","title":"Constructing the test","text":"","category":"section"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"To construct a psychometric test from our custom structs we need some items, persons, and  responses. In this example we will simply use randomly generated data. ","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"For items we just need some BasicItem,","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"items = [BasicItem(i) for i in 1:2]","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"Persons need some anger score in addition to a unique id, ","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"persons = [AngryPerson(p, rand(0:20)) for p in 1:3]","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"Similarly, the TimedResponse for the test will have some randomly generated  timings, ","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"responses = TimedResponse{Int,Int,Int}[]\n\nfor i in 1:2, p in 1:3\n    start_time = now()\n    end_time = start_time + Second(rand(10:600))\n    response = TimedResponse(i, p, rand(0:1), start_time, end_time)\n    push!(responses, response)\nend\n\nresponses","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"The last step is to finally construct the psychometric test.","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"timed_test = PsychometricTest(items, persons, responses)","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"The timed_test is subject to our usual analyses, such as calculating scores.","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"personscores(timed_test)","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"Additionally we can efficiently query the custom fields, e.g.","category":"page"},{"location":"extending_types/","page":"Extending Types","title":"Extending Types","text":"response_times = [response_time(r) for r in eachresponse(timed_test)]","category":"page"},{"location":"#PsychometricTests.jl","page":"Home","title":"PsychometricTests.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Stable) (Image: Dev) (Image: Build Status) (Image: Coverage)","category":"page"},{"location":"","page":"Home","title":"Home","text":"PsychometricTests.jl provides data structures for psychometric testing in Julia. It serves as an entry point to the JuliaPsychometrics ecosystem of packages.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install this package simply use Julias package management system","category":"page"},{"location":"","page":"Home","title":"Home","text":"] add PsychometricTests","category":"page"},{"location":"#Getting-started","page":"Home","title":"Getting started","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"PsychometricTests.jl allows construction and basic analysis of psychometric tests with PsychometricTest. Tests can be constructed from scratch, from an person by item response matrix, or from a Tables.jl compatible source such  as DataFrames.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"using PsychometricTests\n \nresponse_data = rand(0:1, 10, 3)\ntest = PsychometricTest(response_data)","category":"page"},{"location":"","page":"Home","title":"Home","text":"After successful construction, test can be used to query responses,","category":"page"},{"location":"","page":"Home","title":"Home","text":"test[1, :]  # get all responses for person 1\ntest[:, 2]  # get all responses for item 2","category":"page"},{"location":"","page":"Home","title":"Home","text":"and do simple descriptive analysis, such as calculating the total scores for all persons,","category":"page"},{"location":"","page":"Home","title":"Home","text":"personscores(test)","category":"page"},{"location":"#Extending-PsychometricTest","page":"Home","title":"Extending PsychometricTest","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"PsychometricTests.jl includes a minimal implementation for item, person, and response types. However, in practice more complex types might be required.  We provide means to extend the existing types to facilitate these types of analyses.  Please see the docs for more details.","category":"page"}]
}
