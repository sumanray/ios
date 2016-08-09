/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       
        app.receivedEvent('deviceready');
        StatusBar.hide();
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, false);
        
        
        var db = window.sqlitePlugin.openDatabase({name: "SafeDCheckLite.db"});
        
        //Drop table code for adding columns to existing table
        db.transaction(function(tx) {
                       tx.executeSql('Drop table if exists picklist_name_table');
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       }, function() {
                       console.log('transaction ok');
                       });
        
        //Create table for saving picklist name and description
        
        db.transaction(function(tx) {
                       tx.executeSql('CREATE TABLE IF NOT EXISTS picklist_table (id integer primary key AUTOINCREMENT, picklist_name text, picklist_description text, cdatetime integer, favorite integer, auditor_name text, auditor_lob text)');
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       }, function() {
                       console.log('transaction ok');
                       });
       //Create table for saving sections
        
        db.transaction(function(tx) {
                       tx.executeSql('CREATE TABLE IF NOT EXISTS section_table (id, checklist_id integer,  section text, sort_order integer, question_list text)');
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       }, function() {
                       console.log('transaction ok');
                       });
        
       //Create table for saving questions
        
        db.transaction(function(tx) {
                       tx.executeSql('CREATE TABLE IF NOT EXISTS question_table (id, question text, sort_order integer, checklist_id integer, question_type text, photo text, notes text, sub_question_exists integer, sub_question_response text)');
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       }, function() {
                       console.log('transaction ok');
                       });
        
        //Create table for saving sub questions
        
        db.transaction(function(tx) {
                       tx.executeSql('CREATE TABLE IF NOT EXISTS sub_question_table (question_id integer, parent_id integer, question text,  checklist_id integer, sort_order integer, question_type text, photo text, notes text)');
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       }, function() {
                       console.log('transaction ok');
                       });
        
       //Create table for saving answers - multiple choice
        
        db.transaction(function(tx) {
                       tx.executeSql('CREATE TABLE IF NOT EXISTS answer_mc_table (id , answer1 text, answer2 text, answer3 text, answer4 text, answer5 text, corrective_action integer, question_id integer, checklist_id integer)');
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       }, function() {
                       console.log('transaction ok');
                       });
        
       //Create table for saving answers - Yes/No/NA
        db.transaction(function(tx) {
                       tx.executeSql('CREATE TABLE IF NOT EXISTS answer_yn_table (id , corrective_action integer, question_id integer, checklist_id integer)');
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       }, function() {
                       console.log('transaction ok');
                       });
        
        //Create table for saving incomplete audits
        
        db.transaction(function(tx) {
                       tx.executeSql('CREATE TABLE IF NOT EXISTS audit_table (id integer primary key AUTOINCREMENT, audit_name text, audit_description text, checklist_id integer,question_count integer, actual_question_count integer, sub_question_count integer, sub_questions_answered integer,  cdatetime integer, location text, qno integer)');
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       }, function() {
                       console.log('transaction ok');
                       });

        //Create table for saving incomplete audit answers
        
        db.transaction(function(tx) {
                       tx.executeSql('CREATE TABLE IF NOT EXISTS audit_answer_table (checklist_id integer, audit_id integer, question_id integer, cdatetime integer, question text, answer text, photo text, notes text, corrective_action text, photo_width integer, photo_height integer)');
                       }, function(error) {
                       console.log('transaction error: ' + error.message);
                       }, function() {
                       console.log('transaction ok');
                       });
       
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};



