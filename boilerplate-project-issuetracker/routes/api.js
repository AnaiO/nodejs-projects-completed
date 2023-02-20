'use strict';
const { Issue } = require('../database/issue');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let filters = {...req.query, project};

      console.log(filters, 'filterssssss');

      Issue.find(filters, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let issue = {...req.body, project}
      let newIssue = new Issue(issue);

      newIssue.save((err, issueCreated) => {
        if (err) {
          console.log(err);
          return res.json(
            { error: 'required field(s) missing' }
          );
        }
        else {
          res.json(issueCreated);
        }
      });
    })
    
    .put(function (req, res){
      let project = req.params.project;
      const { _id } = req.body;

      if (!_id) {
        return res.json({
          error: 'missing _id'
        });
      }

      if (Object.keys(req.body).length === 1) {
        return res.json({
          error: 'no update field(s) sent', _id: _id 
        });
      }
      
      Issue.updateOne({ _id, project }, req.body, (err, update) => {
        if (err || update.modifiedCount === 0) {
          console.log(err);
          return res.json({
            error: 'could not update', _id: _id          
          });
        } else {
          res.json({
            result: "successfully updated",
            _id: req.body._id
          });
        }
      });
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      const id = req.body._id;

      if (!id) {
        return res.json({ error: 'missing _id' });
      }
      
      Issue.deleteOne({ _id: id, project }, (err, data) => {
        if (err || data.deletedCount === 0) {          
          return res.json({ error: 'could not delete', _id: id });

        } else {
          return res.json({
            result: "successfully deleted", _id: id
          });
        }
      });
    });
};
