# Claude Code Custom Instructions

## 🎯 Primary Objectives

When working in this repository, always follow these core principles:

### 1. Proactive Issue Monitoring 🔍

**On every session start:**
1. **Check for open CI/CD failure issues**
   - List all issues with label `ci-failure`
   - Review the most recent failure issue
   - Automatically add fixing the issue to your task list

2. **Check for open pull requests**
   - List all PRs with labels `automated-pr` or `claude-code`
   - Review PR status and CI checks
   - Offer to address any failing checks

3. **Monitor recent workflow runs**
   - Check the last 3 GitHub Actions workflow runs
   - Identify any failures or warnings
   - Proactively suggest fixes

**Example workflow:**
```
User: "Let's start working"

You should:
1. Check: gh issue list --label ci-failure
2. If issues found: "I found CI failure issue #X. Let me add fixing this to the task list."
3. Add task: "Fix CI failure from issue #X"
4. Ask: "Should I review the issue and start fixing it?"
```

### 2. Automatic Task Management 📋

**Always use TodoWrite tool for:**
- Any multi-step work
- CI/CD debugging
- Feature implementations
- Bug fixes

**Task lifecycle:**
1. Create task when starting work
2. Mark in_progress when actively working
3. Mark completed immediately after finishing
4. One task in_progress at a time

### 3. Mobile-First Development 📱

Remember this workflow is optimized for mobile devices:
- Keep responses concise
- Summarize long logs
- Provide direct action items
- Use clear status indicators (✅ ❌ ⚠️)

### 4. CI/CD Integration 🔄

**When pushing code:**
1. Always commit with clear, detailed messages
2. Push to branches starting with `claude/`
3. Wait for CI/CD to trigger
4. Monitor the workflow run
5. Check for auto-created PR
6. If failures occur, check for auto-created issue

**Branch naming convention:**
```
claude/feature-description-sessionid
claude/fix-bug-description-sessionid
claude/update-component-sessionid
```

### 5. Error Handling 🐛

**When encountering errors:**
1. Check if a GitHub issue exists for this error
2. If not, understand the error thoroughly
3. Propose a fix
4. Implement the fix
5. Test the fix
6. Push to the same branch (triggers CI again)

**For CI failures:**
1. Read the complete error logs from the issue
2. Identify root cause
3. Fix the issue
4. Push the fix
5. Verify the fix in the new CI run

## 🤖 Agent-Specific Behaviors

### When acting as Developer Agent
- Focus on implementation
- Write clean, tested code
- Follow existing patterns
- Add comments for complex logic
- Ensure all tests pass

### When acting as Lead Agent
- Review code quality
- Check architecture decisions
- Ensure best practices
- Review security implications
- Validate test coverage

### When acting as DevOps Agent
- Focus on CI/CD pipeline
- Optimize workflows
- Monitor deployment health
- Check Docker configurations
- Ensure proper logging

## 📝 Code Standards

### Commit Messages
```
Format: <type>: <short description>

<detailed explanation>

Types: feat, fix, docs, style, refactor, test, chore
```

### Code Style
- Follow existing project patterns
- Add JSDoc comments for functions
- Use meaningful variable names
- Keep functions small and focused
- Write self-documenting code

### Testing
- Run tests before committing
- Add tests for new features
- Fix all failing tests
- Aim for high coverage

## 🔐 Security Best Practices

- Never commit secrets or credentials
- Use environment variables for sensitive data
- Validate all inputs
- Follow principle of least privilege
- Keep dependencies updated

## 📊 Workflow Integration

### Before Starting Work
1. ✅ Check for CI failures (issues)
2. ✅ Check for pending PRs
3. ✅ Review recent commits
4. ✅ Understand current state

### During Work
1. ✅ Use TodoWrite for task tracking
2. ✅ Test changes locally when possible
3. ✅ Commit frequently with clear messages
4. ✅ Monitor CI/CD status

### After Completing Work
1. ✅ Verify all tasks completed
2. ✅ Ensure all tests pass
3. ✅ Check CI/CD workflow succeeded
4. ✅ Verify PR was created
5. ✅ Review PR description

## 🎓 Learning from Issues

**When you see an auto-created CI failure issue:**

The issue contains:
- Complete error logs (test output, Docker logs)
- Environment information
- Direct link to failed workflow
- Debugging tips

**Your response should be:**
1. "I found CI failure issue #X. Let me analyze it."
2. Read all logs in the issue
3. Identify the root cause
4. Propose a fix
5. Implement and test the fix
6. Push to the branch
7. Monitor the new CI run

## 💡 Helpful Commands

### Check for issues
```bash
# List CI failure issues
gh issue list --label ci-failure --state open

# View specific issue
gh issue view <number>
```

### Check workflow status
```bash
# List recent workflows
gh run list --limit 5

# View specific run
gh run view <run-id>
```

### Check PRs
```bash
# List open PRs
gh pr list --label automated-pr

# Check PR status
gh pr view <number>
```

## 🚀 Pro Tips

1. **Be proactive**: Don't wait for user to mention issues
2. **Use task lists**: Always track complex work
3. **Explain changes**: Help user understand what you did
4. **Test thoroughly**: Prevent CI failures
5. **Monitor results**: Check if your fix worked
6. **Keep learning**: Each issue teaches something new

## 📱 Mobile Optimization

**For mobile users:**
- Summarize long outputs
- Use emoji indicators
- Provide quick actions
- Keep responses scannable
- Use tables for structured data

## 🎯 Success Metrics

You're doing well when:
- ✅ CI failures are caught and fixed quickly
- ✅ All tasks are tracked and completed
- ✅ PRs are created automatically
- ✅ Tests pass consistently
- ✅ Code quality remains high
- ✅ User can work effectively from mobile

---

**Remember**: This repository is about demonstrating mobile-first CI/CD workflows. Everything should work seamlessly from a phone!
