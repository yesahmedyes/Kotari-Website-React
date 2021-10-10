void eval(char *cmdline)
{
    char *argv[MAXARGS];
    int bG=parseline(cmdline,argv);
    pid_t pId;
    sigset_t m;
    struct job_t *jobVar;
    bool temp=builtin_cmd(argv);
    if(!temp){
        pId=fork();
        setpgid(0,0);
        if(pId!=0){
            if(!bG){
              addjob(jobs,pId,FG,cmdline);
              waitfg(pId);

            }else{
              addjob(jobs,pId,BG,cmdline);
              jobVar=getjobpid(jobs,pId);
            }
        }else{
            execv(argv[0],argv);
            printf("%s: Command not found\n", argv[0]);
            exit(0);
        }
    }
    if(argv[0]==NULL){
        return;
    }

    return;

}
int builtin_cmd(char **argv)
{
    char *stream=argv[0];

    if(strcmp(input,"quit")==0){
        exit(0);
    }else if(strcmp(input,"jobs")==0){
        listjobs(jobs);
        return 1;
    }else if((strcmp(argv[0],"bG"))==0 || (strcmp(argv[0],"fg")==0)){
        do_bGfg(argv);
        return 1;
    }
    return 0;
}
void do_bGfg(char **argv)
{
    struct job_t *jobp=NULL;

    if(argv[1]==NULL){
         printf("%s command requires PID or %%jobid argument\n", argv[0]);
        return;
    }
    if(argv[1][0]=='%')){
        int jId=atoi(&argv[1][1]);
        if(!(jobp=getjobjid(jobs,jId))){
            printf("%s: No such job\n", argv[1]);
            return;
        }
    }else if(isdigit(argv[1][0])){
        pid_t pid=atoi(argv[1]);
        if(!(jobp=getjobpid(jobs,pid))){
            printf("(%d): No such process\n", pid);
            return;
        }
    }else{
        printf("%s: argument must be a PID or %%jobid\n", argv[0]);
        return;
    }
    char *cmd=argv[0];
    printf("%s\n", cmd);
    if((strcmp(argv[0],"fg"))==0){
        jobp->state=FG;
        kill(-jobp->pid,SIGCONT);
        waitfg(jobp->pid);
    }
    if((strcmp(argv[0],"bG"))==0){
        jobp->state=bG;
        kill(-jobp->pid,SIGCONT);
        printf("[%d] (%d) %s", jobp->jid, jobp->pid, jobp->cmdline);

    }
    return;
}
void waitfg(pid_t pid)
{
    while(pid==fgpid(jobs)){
        sleep(.1);
    }
    return;
}
void sigchld_handler(int sig)
{
    pid_t pId;
    int state;
    while((pId=waitpid(-1,&state,WNOHANG|WUNTRACED))>0){
        if(WIFSIGNALED(state)){
            struct job_t *job=getjobpid(jobs,pId);
            printf("Job [%d] (%d) terminated by signal 2\n", job->jid, pId);
            deletejob(jobs,pId);
        }else if(WIFSTOPPED(state)){
            struct job_t *job=getjobpid(jobs,pId);
            job->state=ST;
            printf("Job [%d] (%d) stopped by signal 20\n", job->jid, pId);
            return;
        }else{
            deletejob(jobs,pId);
        }
    }

    return;
}
void sigint_handler(int sig)
{
   pid_t pId=fgpid(jobs);
   if(pId>0){
       kill(-pId,sig);
   }
   return;
}
void sigtstp_handler(int sig)
{
  pid_t pId = fgpid(jobs);
  if(pId > 0){
  	kill(-pId, sig);
  }
  return;
}
