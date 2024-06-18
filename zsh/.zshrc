# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
# if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#   source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
# fi

# source antidote
source /opt/homebrew/opt/antidote/share/antidote/antidote.zsh

# initialize plugins statically with ${ZDOTDIR:-~}/.zsh_plugins.txt
antidote load

export ZSH_COMPDUMP=$ZSH/cache/.zcompdump-$HOST
export ZSH="$HOME/.oh-my-zsh"

source $ZSH/oh-my-zsh.sh

# autoload -Uz promptinit && promptinit && prompt powerlevel10k

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
# [[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

eval "$(starship init zsh)"

# if [ "$TERM_PROGRAM" != "Apple_Terminal" ]; then
#   eval "$(oh-my-posh init zsh)"
# else
#   eval "$(starship init zsh)"
# fi

unset ZSH_AUTOSUGGEST_USE_ASYNC

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/rishabh139/opt/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/rishabh139/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/rishabh139/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/rishabh139/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

eval "$(fzf --zsh)"
eval "$(thefuck --alias fuck)"

export FZF_DEFAULT_COMMAND='rg --files --hidden'
