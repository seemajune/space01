
# flags:
#
#	-t	target project (required)
#	-d	end server directory: optional directory target; defaults to target project value
# 	-r	remove previous deploy directory prior to running grunt
#	-g	skip grunt
#	-c 	commit repo to target git branch
#
set -e

REMOVE_DEPLOY=1
SKIP_GRUNT=0
SKIP_IMAGES=0
TARGET_PROJECT=""
PROJECT_DIR=""
TARGET_DIR=""
GAMES_DIR="games"
PUBLIC_DIR="public"
DEPLOY_DIR="deploy"

function remove_deploy_dir {
	deploy_dir=$PUBLIC_DIR/$DEPLOY_DIR
	if([ -d $deploy_dir ])
		then
		echo "REMOVING PREVIOUS DEPLOY DIRECTORY"
		rm -r $deploy_dir
	else
		echo "$deploy_dir DOES NOT EXIST"
	fi
}

function run_grunt_tasks {
	echo "RUNNING GRUNT, PROJECT = $TARGET_PROJECT"
	grunt -pjt=$TARGET_PROJECT

	make_temp_dir_and_copy_files_to_server
}

function make_temp_dir_and_copy_files_to_server {
	# cd $PUBLIC_DIR
	# echo "MAKING TEMP DIR"
	# cp -r $DEPLOY_DIR $PROJECT_DIR

	dir_to_copy="$PUBLIC_DIR/$DEPLOY_DIR/$PROJECT_DIR"
	. ./bin/dreamhost_copy.sh $dir_to_copy "$GAMES_DIR/$TARGET_DIR"

	# echo "REMOVING TEMP DIR"
	# rm -r $PUBLIC_DIR/$PROJECT_DIR
}

function commit_to_target_git_branch {
	git_branch=$(git symbolic-ref HEAD)
	echo "THE CURRENT NIMITZ BRANCH IS $git_branch"
	
	echo "PLEASE ENTER GIT COMMIT MESSAGE:" 
	read msg
	
	git add --all :/
	git commit -am "${msg}"
	git push origin $git_branch
	echo "PUSHED GIT COMMIT TO $git_branch"
}

while getopts "t:d:r:igc" opt; do
	case $opt in
	    t)
			TARGET_PROJECT=$OPTARG
	    	;;
		d)
			TARGET_DIR=$OPTARG
			;;
		r)
			REMOVE_DEPLOY=1
			;;
		i)
			SKIP_IMAGES=1
			;;
		g) 
			SKIP_GRUNT=1
			;;
		c)
			COMMIT_GIT=1
			;;
	    \?)
	    	printf "\nERROR: INVALID OPTION: -$OPTARG\n" >&2
	    	exit 1
	    	;;
	    :)
	    	printf "\nERROR: OPTION -$OPTARG REQUIRES AN ARGUMENT\n" >&2
	    	exit 1
	    	;;
  esac
done

# if([ "$SKIP_IMAGES" = 1 ])
# 	then
# 	REMOVE_DEPLOY=1
# fi

if([ "$REMOVE_DEPLOY" = 1 -a "$SKIP_GRUNT" = 1 ])
	then 
	# default to deployment of all tags types if no flag(s) specified: 
	echo "ERROR: CAN NOT REMOVE PREVIOUS DEPLOY DIRECTORY AND SKIP GRUNT"
	exit 1
fi

if([ "$TARGET_PROJECT" = "" ]) 
	then
	echo "ERROR: CAN NOT DEPLOY WITHOUT TARGET PROJECT"
	exit 1
else 
	PROJECT_DIR="$TARGET_PROJECT/"
	if([ "$TARGET_DIR" = "" ])
		then
		TARGET_DIR="$TARGET_PROJECT"
	fi
fi

echo "DEPLOYING GAME"


if([ "$REMOVE_DEPLOY" = 1 ])
	then 
	remove_deploy_dir
fi

if([ "$SKIP_GRUNT" = 0 ])
	then
	run_grunt_tasks
else
	make_temp_dir_and_copy_files_to_server
fi

if([ "$COMMIT_GIT" = 1 ])
	then
	commit_to_target_git_branch
fi

echo "GAME DEPLOY COMPLETE!"

exit 0