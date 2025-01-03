#!/usr/bin/env bash

if [[ ! -f ~/.nvm/nvm.sh ]]
then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    NVM_DIR="$HOME/.nvm"
    [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
else
    source ~/.nvm/nvm.sh
fi

nvm install && nvm use && npm install --save
