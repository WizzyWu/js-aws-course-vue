## Outputs:
- https://d29qcu9ke2ed75.cloudfront.net/ - CloudFront distribution domain name
- http://popov-js-aws-course.s3-website-eu-west-1.amazonaws.com/ - S3 Static site host

## Task 1
What was done:
- Cloned Vue From App from repository
- Install dependencies
- Registered in AWS
- IAM user was created
- Using CLI, connected to my AWS account and got the created IAM user information


## Task 2 (CURRENT)
What was done:
- Task 2.1 Manual Deployment
    * In the AWS Console created and configured an S3 bucket.
    * Built and manually uploaded the MyShop! app to the created S3 bucket. Checked.
    * Created a CloudFront distribution for my app. Checked.
- Task 2.2 Automated Deployment
    * Added and configure serverless and serverless-finch plugins.
    * Manually created CloudFront invalidation.
    * Destroyed the created AWS infrastructure.
    * Added and configured serverless-single-page-app-plugin. * Added necessary npm script to build, upload, and invalidate app source code.
    * Tested automated deployment.
- Task 2.3
    * Stored links to CloudFront URL and S3-website in README.md file.
    * Commited all my work to separate branch.