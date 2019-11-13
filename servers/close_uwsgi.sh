#!/bin/bash
pidof uwsgi | xargs kill -9
service supervisor restart
