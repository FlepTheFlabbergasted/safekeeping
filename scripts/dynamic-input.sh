#!/bin/bash

# input code taken from http://mywiki.wooledge.org/BashFAQ/035

die() {
    printf '%s\n' "$1" >&2
    exit 1
}

# Usage info
show_help() {
cat << EOF
Usage: ${0##*/} --customer_number=NR --pid=PID --consilio_env=ENV --session_template=TEMPLATE [--end_step=NR]
    --help                  Display this help and exit
    --customer_number       Assign the customer number to use
    --pid                   Assign the advisor PID to use
    --consilio_env          Assign the Consilio environment to use [acc|sdev|sdev2|sdev3]
    --session_template      Assign the session template to use [PensionSaving|PensionAdvice]
    --end_step              Runs the script up to this step number (optional)
    Example
    ${0##*/} --customer_number=196307100450 --pid=p327ra8 --consilio_env=sdev --session_template=PensionAdvice
EOF
}

required_params=("customer_number" "pid" "consilio_env" "session_template")

# Initialize all the option variables
# This ensures we are not contaminated by variables from the environment
end_step=0

while :; do
    case $1 in
        -h|-\?|--help)
            show_help
            exit
            ;;
        ###################################
        #    Optional parameters begin    #
        ###################################
        --end_step=?*)
            end_step=${1#*=}
            ;;
        --end_step|--end_step=)
            die 'ERROR: "--end_step" requires a non-empty option argument'
            ;;
        ###################################
        #    Optional parameters end      #
        ###################################

        # Required params
        --?*)
            # https://www.cyberciti.biz/tips/bash-shell-parameter-substitution-2.html
            param=${1##*--}                                         # Removes the double dashes
            param_name=$(echo "$param" | sed 's/\(.*\)=.*/\1/')     # Gets the param name
            param_val=$(echo "$param" | sed 's/.*=\(.*\)/\1/')      # Gets the param value

            echo "name: $param_name"
            echo "value: $param_val"
            echo ""

            known_param=
            for param in ${required_params[@]}; do
                if [ "$param_name" = "$param" ]; then
                    # A match for a required param is found
                    known_param=0
                fi
            done

            # No match for a required param was found
            if [ -z "$known_param" ]; then
                die "ERROR: Unknown option '$param_name'"
            fi

            # Value is empty or no value was given after '='
            if [ -z "$param_val" ] || [ "$param_name" = "$param_val" ]; then
                die "ERROR: '$param_name' requires a non-empty option argument"
            fi

            # https://stackoverflow.com/questions/16553089/dynamic-variable-names-in-bash
            # Assigns the dynamic variable name its value
            printf -v "$param_name" '%s' "$param_val"
            ;;
        --)         # End of all options.
            shift
            break
            ;;
        *)          # Default case: No more options, so break out of the loop.
            break
    esac

    shift
done

# Check that all required params are set
for param in ${required_params[@]}; do
    if [ -z "${!param}" ]; then
        die "ERROR: '$param' requires a non-empty option argument"
    fi
done
